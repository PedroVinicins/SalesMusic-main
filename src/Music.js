    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progress-bar');
    const progressThumb = document.getElementById('progress-thumb');
    const currentTimeElement = document.getElementById('current-time');
    const totalTimeElement = document.getElementById('total-time');
    const playButton = document.querySelector('.controls button:nth-child(2)');

    // Atualiza o tempo total quando a música é carregada
    audioPlayer.addEventListener('loadedmetadata', function() {
        const totalTime = audioPlayer.duration;
        const minutes = Math.floor(totalTime / 60);
        const seconds = Math.floor(totalTime % 60);
        totalTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });

    // Atualiza a barra de progresso enquanto a música está tocando
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercentage = (currentTime / duration) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressThumb.style.left = `calc(${progressPercentage}% - 5px)`; // Desloca o thumb
        
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });

    // Controla play/pause
    function playPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.innerHTML = "&#10074;&#10074;"; // ícone de pause
        } else {
            audioPlayer.pause();
            playButton.innerHTML = "&#9654;"; // ícone de play
        }
    }

    function nextTrack() {
        // Avançar para a próxima música
        audioPlayer.currentTime = 0; // Reinicia a música
        audioPlayer.play(); // Inicia a música novamente
    }

    function prevTrack() {
        // Retroceder para a música anterior
        audioPlayer.currentTime = 0; // Reinicia a música
        audioPlayer.play(); // Inicia a música novamente
    }

    // Funcionalidade para arrastar a barra de progresso
    let isDragging = false;

    progressThumb.addEventListener('mousedown', (e) => {
        isDragging = true;

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.removeEventListener('mousemove', onDrag);
        });
    });
    
        // Controle de volume
    const volumeSlider = document.getElementById('volumeSlider');

    // Atualiza o volume do áudio conforme o slider é movido
    volumeSlider.addEventListener('input', function () {
        audioPlayer.volume = volumeSlider.value;
    });


    function onDrag(e) {
        if (isDragging) {
            const progressContainer = document.querySelector('.progress-container');
            const progressContainerRect = progressContainer.getBoundingClientRect();
            const offsetX = e.clientX - progressContainerRect.left;
            const progressPercentage = Math.min(Math.max(0, (offsetX / progressContainerRect.width) * 100), 100);

            progressBar.style.width = progressPercentage + '%';
            progressThumb.style.left = `calc(${progressPercentage}% - 5px)`; // Move o thumb
            
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (progressPercentage / 100) * duration;
        }
    }
