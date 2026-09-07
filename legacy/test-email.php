<?php
if (mail("julian.busletta@gmail.com", "Test desde DonWeb", "Hola! Esta es una prueba desde el servidor DonWeb")) {
    echo "Enviado";
} else {
    echo "Error";
}
?>
