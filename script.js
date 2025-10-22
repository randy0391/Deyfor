document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoContainer = videoModal.querySelector('.video-container');
    
    // Función para cargar y reproducir el video local
    const loadVideo = (videoFileName) => {
        // Limpia el contenedor antes de añadir el nuevo video
        videoContainer.innerHTML = ''; 

        // Crea el elemento <video>
        const video = document.createElement('video');
        video.setAttribute('controls', ''); // Muestra los controles de reproducción
        video.setAttribute('autoplay', ''); // Inicia la reproducción automáticamente
        video.setAttribute('class', 'img-fluid'); // Clase de Bootstrap para responsividad
        
        // Crea el elemento <source> para especificar la ruta del archivo
        const source = document.createElement('source');
        source.setAttribute('src', videoFileName);
        source.setAttribute('type', 'video/mp4'); // Puedes añadir más tipos si usas WebM o Ogg
        
        // Añade el source al video, y el video al contenedor
        video.appendChild(source);
        videoContainer.appendChild(video);
    };

    // Función para detener y limpiar el video
    const stopVideo = () => {
        videoContainer.innerHTML = ''; // Detiene la reproducción al eliminar el elemento <video>
    };

    // 1. Manejar el evento 'show.bs.modal'
    videoModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Botón que disparó el modal
        // Leemos el atributo 'data-video-file'
        const videoFileName = button.getAttribute('data-video-file');
        
        if (videoFileName) {
            loadVideo(videoFileName);
        }
    });

    // 2. Manejar el evento 'hidden.bs.modal'
    videoModal.addEventListener('hidden.bs.modal', stopVideo);
});