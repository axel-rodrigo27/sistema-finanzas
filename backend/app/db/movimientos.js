import { dbClient } from "./pool.js";

//para la pagina de inicio.html
//registro de los 3 movimientos para el inicio.html
export async function getTreemovimientos(id_usuario) {
    const result= await dbClient.query("SELECT tipo,monto,id_categoria,descripcion,fecha_registro FROM movimientos WHERE id_usuario=$1 ORDER BY fecha_registro DESC LIMIT 3",[id_usuario]);
    return result.rows;
}


//total de ingresos
export async function getTotalingresos(id_usuario) {
    const result=await dbClient.query("SELECT ROUND(COALESCE(SUM(monto), 0), 2) AS suma_total FROM movimientos WHERE id_usuario=$1 AND tipo='ingreso'",[id_usuario]);
    return result.rows;
}

//total de gasto
export async function getTotalGastos(id_usuario) {
    const result=await dbClient.query("SELECT ROUND(COALESCE(SUM(monto), 0), 2) AS suma_total FROM movimientos WHERE id_usuario=$1 AND tipo='gasto'",[id_usuario]);
    return result.rows;
}
//balance total
export async function getTotalCapital(id_usuario) {
    const result=await dbClient.query("SELECT ROUND(COALESCE(SUM(CASE WHEN tipo='ingreso' THEN monto ELSE -monto END), 0), 2) AS suma_total FROM movimientos WHERE id_usuario=$1",[id_usuario]);
    return result.rows;
}