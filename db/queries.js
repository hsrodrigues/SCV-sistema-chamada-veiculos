const pool = require('./connection');

// Busca todos os veículos que não estão finalizados
async function getActiveVehicles() {
  const [rows] = await pool.query("SELECT * FROM veiculos WHERE status != 'Finalizado' ORDER BY chegada ASC");
  return rows;
}

// Adiciona um novo veículo ou reativa um existente
async function addOrUpdateVehicle(data) {
    const { placa, motorista, transportadora, socket_id } = data;
    const sql = `
        INSERT INTO veiculos (placa, motorista, transportadora, socket_id, chegada, status, horario_chamada, tempo_espera_minutos)
        VALUES (?, ?, ?, ?, NOW(), 'Aguardando', NULL, NULL)
        ON DUPLICATE KEY UPDATE
        motorista = VALUES(motorista),
        transportadora = VALUES(transportadora),
        socket_id = VALUES(socket_id),
        chegada = NOW(),
        status = 'Aguardando',
        horario_chamada = NULL,
        tempo_espera_minutos = NULL
    `;
    await pool.query(sql, [placa, motorista, transportadora, socket_id]);
}

// Busca um veículo pela placa
async function getVehicleByPlaca(placa) {
    const [rows] = await pool.query('SELECT * FROM veiculos WHERE placa = ?', [placa]);
    return rows[0];
}

// Atualiza o status de um veículo (usado para confirmar e finalizar)
async function updateVehicleStatus(placa, status) {
  await pool.query('UPDATE veiculos SET status = ? WHERE placa = ?', [status, placa]);
}

// --- SEÇÃO MODIFICADA ---
// Atualiza o status, a hora da chamada e o tempo de espera de um veículo
async function updateVehicleCall(placa, status, horarioChamada, tempoEsperaMinutos) {
  const sql = 'UPDATE veiculos SET status = ?, horario_chamada = ?, tempo_espera_minutos = ? WHERE placa = ?';
  await pool.query(sql, [status, horarioChamada, tempoEsperaMinutos, placa]);
}
// --- FIM DA SEÇÃO MODIFICADA ---

module.exports = {
  getActiveVehicles,
  addOrUpdateVehicle,
  getVehicleByPlaca,
  updateVehicleStatus,
  updateVehicleCall,
};