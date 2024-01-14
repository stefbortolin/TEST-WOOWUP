select c.nombre as nombre, c.apellido as apellido, sum(v.Importe) as total
from clientes c
join ventas v on c.id = v.id_cliente
where v.fecha >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
group by c.id
having sum(v.importe) > 100000;