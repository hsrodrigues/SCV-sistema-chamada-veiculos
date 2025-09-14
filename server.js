require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./db/queries');

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const broadcastListUpdate = async () => {
    try {
        const veiculos = await db.getActiveVehicles();
        io.emit('lista:atualizada', veiculos);
    } catch (error) {
        console.error("Erro ao buscar e transmitir lista de veículos:", error);
    }
};

io.on('connection', async (socket) => {
    console.log('Novo cliente conectado:', socket.id);
    broadcastListUpdate();

    socket.on('motorista:checkin', async (data) => {
        try {
            console.log('Novo check-in recebido:', data.placa);
            const vehicleData = { ...data, socket_id: socket.id };
            await db.addOrUpdateVehicle(vehicleData);
            await broadcastListUpdate();
        } catch (error) {
            console.error("Erro no evento 'motorista:checkin':", error);
        }
    });

    // --- SEÇÃO MODIFICADA ---
    socket.on('analista:chamar', async ({ placa, doca }) => {
        try {
            const horarioChamada = new Date();
            // 1. Busca os dados do veículo ANTES de fazer a alteração
            const veiculo = await db.getVehicleByPlaca(placa);

            if (veiculo && veiculo.status === 'Aguardando') {
                // 2. Calcula o tempo de espera em minutos
                const tempoEsperaMs = horarioChamada - new Date(veiculo.chegada);
                const tempoEsperaMinutos = Math.floor(tempoEsperaMs / 60000);

                console.log(`Veículo ${placa} chamado para a linha ${doca}. Tempo de espera: ${tempoEsperaMinutos} min.`);
                
                // 3. Salva o status, a hora da chamada E o tempo de espera calculado
                await db.updateVehicleCall(placa, 'Chamado', horarioChamada, tempoEsperaMinutos);
            
                if (veiculo.socket_id) {
                    io.to(veiculo.socket_id).emit('veiculo:chamado', { placa, doca });
                }
                await broadcastListUpdate();
            }
        } catch (error) {
            console.error("Erro no evento 'analista:chamar':", error);
        }
    });
    // --- FIM DA SEÇÃO MODIFICADA ---
    
    socket.on('motorista:confirmar', async (placa) => {
        try {
            await db.updateVehicleStatus(placa, 'Acessando Fábrica');
            await broadcastListUpdate();
        } catch (error) {
            console.error("Erro no evento 'motorista:confirmar':", error);
        }
    });

    socket.on('analista:finalizar', async (placa) => {
        try {
            console.log(`Processo finalizado para ${placa}`);
            await db.updateVehicleStatus(placa, 'Finalizado');
            await broadcastListUpdate();
        } catch (error) {
            console.error("Erro no evento 'analista:finalizar':", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(PORT, () => console.log(`Servidor rodando em produção na porta ${PORT}.`));