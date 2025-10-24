document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoContainer = videoModal.querySelector('.video-container');

    // --- LÓGICA DE BARRA DE PROGRESO ---
    const allMarkers = document.querySelectorAll('[data-video-file]');
    
    // 1. Obtener todos los nombres de archivo de video únicos
    const allVideoFiles = new Set();
    allMarkers.forEach(marker => {
        allVideoFiles.add(marker.getAttribute('data-video-file'));
    });
    const totalVideos = allVideoFiles.size; // Total de videos únicos
    
    // 2. Inicializar el seguimiento de videos vistos (en la sesión actual)
    let videosVistos = new Set();
    const progressBar = document.getElementById('video-progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // Función para actualizar la barra de progreso
    const updateProgress = () => {
        const videosVistosCount = videosVistos.size;
        const percentage = totalVideos > 0 ? (videosVistosCount / totalVideos) * 100 : 0;

        // Actualiza el ancho visual y el valor aria
        progressBar.style.width = percentage.toFixed(2) + '%';
        progressBar.setAttribute('aria-valuenow', percentage.toFixed(0));
        
        // Actualiza el texto de progreso
        progressText.textContent = `${videosVistosCount} / ${totalVideos} Videos Vistos`;
        
        // Opcional: Cambiar el color cuando está completo (a color amarillo de Bootstrap)
        if (percentage >= 100) {
            progressBar.classList.remove('bg-success');
            progressBar.classList.add('bg-warning');
        } else {
            progressBar.classList.remove('bg-warning');
            progressBar.classList.add('bg-success');
        }
    };

    // Inicializar el texto y el estado al cargar la página
    updateProgress();
    
    // --- LÓGICA DE VIDEO ---
    
    // Función para cargar y reproducir el video local
    const loadVideo = (videoFileName) => {
        // Limpia el contenedor antes de añadir el nuevo video
        videoContainer.innerHTML = ''; 

        // Crea el elemento <video>
        const video = document.createElement('video');
        video.setAttribute('controls', ''); 
        video.setAttribute('autoplay', ''); 
        video.setAttribute('class', 'img-fluid'); 
        
        // Crea el elemento <source> para especificar la ruta del archivo
        const source = document.createElement('source');
        source.setAttribute('src', videoFileName);
        source.setAttribute('type', 'video/mp4'); 
        
        // Añade el source al video, y el video al contenedor
        video.appendChild(source);
        videoContainer.appendChild(video);
    };

    // Función para detener y limpiar el video
    const stopVideo = () => {
        videoContainer.innerHTML = ''; 
    };

    // 1. Manejar el evento 'show.bs.modal'
    videoModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; 
        const videoFileName = button.getAttribute('data-video-file');
        
        if (videoFileName) {
            loadVideo(videoFileName);
            
            // LÓGICA DE PROGRESO: Marcar el video como visto
            if (!videosVistos.has(videoFileName)) {
                videosVistos.add(videoFileName);
                updateProgress(); // Actualiza el progreso
            }
        }
        
        // Si el videoModal se abre desde el impulseModal, cerrar el impulseModal
        const impulseModal = document.getElementById('impulseModal');
        if (impulseModal && impulseModal.classList.contains('show')) {
            const bootstrapModal = bootstrap.Modal.getInstance(impulseModal);
            if (bootstrapModal) {
                 bootstrapModal.hide();
            }
        }

    });

    // 2. Manejar el evento 'hidden.bs.modal'
    videoModal.addEventListener('hidden.bs.modal', stopVideo);
});