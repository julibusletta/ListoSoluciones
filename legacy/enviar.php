<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Mostrar errores (solo en desarrollo)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Verificar que se recibió el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Cargar PHPMailer
    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    // Variables del formulario con validación básica
    $nombre = $_POST['volunteer-name'] ?? '';
    $email = $_POST['volunteer-email'] ?? '';
    $asunto = $_POST['volunteer-subject'] ?? 'Consulta desde el formulario web';
    $mensaje = $_POST['volunteer-message'] ?? '';

    // Si faltan datos importantes, salimos
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo 'error';
        exit;
    }

    // Crear objeto PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'c2840403.ferozo.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'administracion@listosoluciones.com.ar';
        $mail->Password = 'Pinelli002@';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Remitente y destinatario
        $mail->setFrom('administracion@listosoluciones.com.ar', 'Formulario Web');
        $mail->addAddress('administracion@listosoluciones.com.ar');

        // Contenido del mensaje
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = "
            <strong>Nombre:</strong> {$nombre}<br>
            <strong>Email:</strong> {$email}<br>
            <strong>Asunto:</strong> {$asunto}<br>
            <strong>Mensaje:</strong><br>" . nl2br($mensaje);

        // Enviar
        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo 'error';
    }
} else {
    echo 'Acceso no permitido';
}
