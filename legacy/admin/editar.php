<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit;
}

$dataFile = '../data/obras.json';
$obras = [];
if (file_exists($dataFile)) {
    $obras = json_decode(file_get_contents($dataFile), true);
}

function saveObras($obras, $file) {
    file_put_contents($file, json_encode($obras, JSON_PRETTY_PRINT));
}

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: index.php');
    exit;
}
$id = (int)$id;

$obraIndex = null;
foreach ($obras as $index => $o) {
    if ($o['id'] === $id) {
        $obraIndex = $index;
        break;
    }
}

if ($obraIndex === null) {
    die("Obra no encontrada.");
}

$obra = &$obras[$obraIndex];
$msg = '';

// Handle Updates
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['update_meta'])) {
        $obra['titulo'] = $_POST['titulo'];
        $obra['descripcion'] = $_POST['descripcion'];
        saveObras($obras, $dataFile);
        $msg = 'Datos actualizados correctamente.';
    }
    
    if (isset($_POST['upload_image'])) {
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES['imagen']['tmp_name'];
            $name = basename($_FILES['imagen']['name']);
            // Para evitar colisiones, agreamos un prefijo único
            $safeName = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9.\-_]/', '', $name);
            $uploadDir = '../images/obras_uploads/';
            
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            
            $destination = $uploadDir . $safeName;
            
            if (move_uploaded_file($tmpName, $destination)) {
                $obra['imagenes'][] = 'images/obras_uploads/' . $safeName;
                saveObras($obras, $dataFile);
                $msg = 'Imagen subida correctamente.';
            } else {
                $msg = 'Error al mover el archivo subido.';
            }
        } else {
            $msg = 'Error al subir la imagen (codigo ' . $_FILES['imagen']['error'] . ').';
        }
    }
}

// Handle Image Deletion
if (isset($_GET['delete_img'])) {
    $imgToDelete = $_GET['delete_img'];
    $key = array_search($imgToDelete, $obra['imagenes']);
    if ($key !== false) {
        unset($obra['imagenes'][$key]);
        $obra['imagenes'] = array_values($obra['imagenes']); // Re-index
        
        // Remove physical file if it's in our uploads folder
        if (strpos($imgToDelete, 'images/obras_uploads/') === 0) {
            $physicalPath = '../' . $imgToDelete;
            if (file_exists($physicalPath)) {
                unlink($physicalPath);
            }
        }
        
        saveObras($obras, $dataFile);
        header("Location: editar.php?id=$id&msg=deleted");
        exit;
    }
}

if (isset($_GET['msg']) && $_GET['msg'] === 'deleted') {
    $msg = 'Imagen eliminada.';
}
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Editar Obra - Admin</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/bootstrap-icons.css" rel="stylesheet">
    <style>
        .img-thumbnail-container { position: relative; display: inline-block; margin: 10px; }
        .img-thumbnail-container img { height: 120px; object-fit: cover; }
        .btn-delete-img { position: absolute; top: -10px; right: -10px; border-radius: 50%; padding: 0.1rem 0.4rem; }
    </style>
</head>
<body class="bg-light">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
        <a class="navbar-brand" href="index.php">Listo! Soluciones Admin</a>
        <div class="ms-auto">
            <a href="index.php" class="btn btn-outline-light btn-sm me-2">Volver al Dashboard</a>
            <a href="logout.php" class="btn btn-danger btn-sm">Cerrar Sesión</a>
        </div>
    </div>
</nav>

<div class="container">
    <h2>Editar Obra: <?= htmlspecialchars($obra['titulo']) ?></h2>

    <?php if ($msg): ?>
        <div class="alert alert-info"><?= htmlspecialchars($msg) ?></div>
    <?php endif; ?>

    <div class="row">
        <div class="col-md-6">
            <div class="card mb-4">
                <div class="card-header bg-white">
                    <h5 class="mb-0">Información General</h5>
                </div>
                <div class="card-body">
                    <form method="post">
                        <input type="hidden" name="update_meta" value="1">
                        <div class="mb-3">
                            <label class="form-label">Título</label>
                            <input type="text" name="titulo" class="form-control" value="<?= htmlspecialchars($obra['titulo']) ?>" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Descripción (acepta HTML)</label>
                            <textarea name="descripcion" class="form-control" rows="4"><?= htmlspecialchars($obra['descripcion']) ?></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="card mb-4">
                <div class="card-header bg-white">
                    <h5 class="mb-0">Subir Nueva Foto</h5>
                </div>
                <div class="card-body">
                    <form method="post" enctype="multipart/form-data">
                        <input type="hidden" name="upload_image" value="1">
                        <div class="mb-3">
                            <label class="form-label">Seleccionar imagen</label>
                            <input class="form-control" type="file" name="imagen" accept="image/*" required>
                        </div>
                        <button type="submit" class="btn btn-success">Subir Foto</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-white">
            <h5 class="mb-0">Fotos Actuales</h5>
        </div>
        <div class="card-body">
            <?php if (empty($obra['imagenes'])): ?>
                <p>No hay fotos para esta obra.</p>
            <?php else: ?>
                <div class="d-flex flex-wrap">
                    <?php foreach ($obra['imagenes'] as $img): ?>
                        <div class="img-thumbnail-container">
                            <img src="../<?= htmlspecialchars($img) ?>" class="img-thumbnail" alt="Foto">
                            <a href="editar.php?id=<?= $id ?>&delete_img=<?= urlencode($img) ?>" class="btn btn-danger btn-sm btn-delete-img" onclick="return confirm('¿Eliminar esta foto?');" title="Eliminar">&times;</a>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

</body>
</html>
