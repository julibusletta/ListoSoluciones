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

// Helper to save data
function saveObras($obras, $file) {
    file_put_contents($file, json_encode($obras, JSON_PRETTY_PRINT));
}

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add_obra'])) {
        $newId = 1;
        if (count($obras) > 0) {
            $newId = max(array_column($obras, 'id')) + 1;
        }
        $newObra = [
            'id' => $newId,
            'titulo' => $_POST['titulo'],
            'descripcion' => $_POST['descripcion'],
            'imagenes' => []
        ];
        $obras[] = $newObra;
        saveObras($obras, $dataFile);
        header('Location: index.php?msg=added');
        exit;
    }
}

if ($action === 'delete') {
    $idToDelete = (int)$_GET['id'];
    foreach ($obras as $key => $obra) {
        if ($obra['id'] === $idToDelete) {
            // Eliminar imagenes físicamente si están en una carpeta de uploads (opcional, por ahora solo sacamos del JSON)
            unset($obras[$key]);
            $obras = array_values($obras); // reindex
            saveObras($obras, $dataFile);
            header('Location: index.php?msg=deleted');
            exit;
        }
    }
}

?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Admin - Obras</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/bootstrap-icons.css" rel="stylesheet">
</head>
<body class="bg-light">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
        <a class="navbar-brand" href="index.php">Listo! Soluciones Admin</a>
        <div class="ms-auto">
            <a href="../index.php" target="_blank" class="btn btn-outline-light btn-sm me-2">Ver Sitio</a>
            <a href="logout.php" class="btn btn-danger btn-sm">Cerrar Sesión</a>
        </div>
    </div>
</nav>

<div class="container">
    <h2>Gestionar Obras</h2>
    
    <?php if (isset($_GET['msg'])): ?>
        <?php if ($_GET['msg'] == 'added'): ?>
            <div class="alert alert-success">Obra agregada correctamente.</div>
        <?php elseif ($_GET['msg'] == 'deleted'): ?>
            <div class="alert alert-warning">Obra eliminada.</div>
        <?php endif; ?>
    <?php endif; ?>

    <div class="card mb-4">
        <div class="card-header bg-white">
            <h5 class="mb-0">Agregar Nueva Obra</h5>
        </div>
        <div class="card-body">
            <form method="post">
                <input type="hidden" name="add_obra" value="1">
                <div class="mb-3">
                    <label class="form-label">Título</label>
                    <input type="text" name="titulo" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Descripción (acepta HTML como &lt;br&gt;)</label>
                    <textarea name="descripcion" class="form-control" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Crear Obra</button>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-white">
            <h5 class="mb-0">Listado de Obras</h5>
        </div>
        <div class="card-body p-0">
            <table class="table table-hover mb-0">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Imágenes</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($obras as $obra): ?>
                    <tr>
                        <td><?= $obra['id'] ?></td>
                        <td><?= htmlspecialchars($obra['titulo']) ?></td>
                        <td><?= count($obra['imagenes']) ?> fotos</td>
                        <td class="text-end">
                            <a href="editar.php?id=<?= $obra['id'] ?>" class="btn btn-sm btn-info text-white">Editar / Fotos</a>
                            <a href="index.php?action=delete&id=<?= $obra['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('¿Estás seguro de eliminar esta obra?');">Eliminar</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php if (empty($obras)): ?>
                    <tr><td colspan="4" class="text-center">No hay obras registradas.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

</body>
</html>
