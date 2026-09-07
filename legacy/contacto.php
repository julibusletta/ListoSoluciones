<?php
// Configuración
$to = "administracion@listosoluciones.com.ar";
$subject = "Nueva consulta desde el formulario de contacto";

// Datos del formulario
$name = $_POST['volunteer-name'] ?? '';
$email = $_POST['volunteer-email'] ?? '';
$subjectInput = $_POST['volunteer-subject'] ?? '';
$message = $_POST['volunteer-message'] ?? '';

// Validación básica
if (!empty($name) && !empty($email) && !empty($message)) {
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Nombre: $name\n";
    $body .= "Email: $email\n";
    $body .= "Asunto: $subjectInput\n\n";
    $body .= "Mensaje:\n$message\n";

    // Envío
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "incomplete";
}
?>
