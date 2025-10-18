const MY_NAME = getComputedStyle(document.documentElement).getPropertyValue('--my-name').trim().replace(/"/g, '');
const HER_NAME = getComputedStyle(document.documentElement).getPropertyValue('--her-name').trim().replace(/"/g, '');
const CORRECT_PASSWORD = "0312"; 
const MAX_LOVE_STRENGTH = 9;    

const PETAL_IMAGE_URLS = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQef4dVZTlCGCw2oLXEyijRcbMmmhKgIW4gFQ&s',   
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKueGTjVnZfKxlmc8_g8XzInv7pZmZ1WnMQ&s',
];
const FIREWORK_COLORS = ['#FFD700', '#FF4500', '#DA70D6', '#00FFFF', '#32CD32', '#FF69B4'];
let currentLoveStrength = 0;
let isAccepted = false;

const splashScreen = document.getElementById('splash-screen');
const loveModal = document.getElementById('love-modal');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const modalNames = document.getElementById('modal-names');
const modalStatus = document.getElementById('modal-status');
const modalMessage = document.getElementById('modal-message');
const passwordInput = document.getElementById('password-input');
const enterBtn = document.getElementById('enter-btn');
const errorMessage = document.getElementById('error-message');
const displayHerName = document.getElementById('display-her-name');
const petalContainer = document.getElementById('petal-container');

displayHerName.textContent = HER_NAME;
modalNames.textContent = `Gửi đến Em, ${HER_NAME} (Từ ${MY_NAME})`;

let petalInterval;

function createPetal(isFirework = false) { 
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    if (isFirework) {
        petal.style.backgroundImage = 'none';
        petal.style.backgroundColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
        petal.style.borderRadius = '50%';
        petal.style.width = petal.style.height = Math.random() * 8 + 4 + 'px'; 
        petal.style.zIndex = 90; 
        
    } else {
        
        const imageUrl = PETAL_IMAGE_URLS[Math.floor(Math.random() * PETAL_IMAGE_URLS.length)];
        petal.style.backgroundImage = `url('${imageUrl}')`;
        petal.style.width = petal.style.height = Math.random() * 20 + 15 + 'px';
        petal.style.zIndex = 10;
    }
    
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = Math.random() * 5 + 7 + 's'; 
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.animationName = 'fall-petal';

    petalContainer.appendChild(petal);
    
    
    setTimeout(() => { petal.remove(); }, 12000); 
}

function runFireworks() {
  
    let count = 0;
    const fireworkEffect = setInterval(() => {
        
        for (let i = 0; i < 50; i++) {
            createPetal(true); 
        }
        count++;
        if (count > 15) { 
            clearInterval(fireworkEffect);
            
           
            setTimeout(() => {
                petalInterval = setInterval(createPetal, 300); 
            }, 500); 
        }
    }, 200); 
}



function updateModal(title, message, status) {
    modalNames.textContent = title;
    modalMessage.innerHTML = message;
    modalStatus.textContent = status;
}

function showModal() {
    splashScreen.style.opacity = '0';
    setTimeout(() => {
        splashScreen.style.display = 'none';
        loveModal.style.display = 'block';
      
        petalInterval = setInterval(createPetal, 300); 
    }, 1000);
}

function handleAccept() {
    if (isAccepted) return;
    isAccepted = true;
    clearInterval(petalInterval); 

    updateModal(`🎉 CHÚC MỪNG! ĐÃ ĐỒNG Ý! ❤️`, 
                `Mối quan hệ đã được thiết lập. ${HER_NAME} là người yêu của ${MY_NAME} rồi! Chúng ta hãy viết chương trình hạnh phúc mới!`,
                "Tình Yêu Vĩnh Cửu Đã Bắt Đầu!");
    
    btnNo.style.display = 'none';
    btnYes.textContent = 'MÃI MÃI';
    btnYes.style.backgroundColor = '#FFD700'; 
    btnYes.style.color = '#333';
    btnYes.disabled = true;

 
    runFireworks();
}

function handleReject() {
    if (isAccepted) return;
    currentLoveStrength++;

    if (currentLoveStrength > MAX_LOVE_STRENGTH) {
        
        updateModal(`💍 ĐÃ KẾT THÚC VÒNG LẶP!`, 
                    `Hệ thống đã quyết định: ${HER_NAME} là của ${MY_NAME}. Tình yêu đã đạt giới hạn. (Định Mệnh đã can thiệp!) ✨`,
                    "Không Thể Chối Cãi!");
        
        btnNo.style.display = 'none';
        handleAccept(); 
        return;
    }
    
 
    updateModal(`Lỗi Logic / Tăng Cường Tình Yêu...`, 
                `Anh hiểu rằng em cần thêm thời gian. Sức Mạnh Tình Yêu đã tăng lên <b>${currentLoveStrength}/${MAX_LOVE_STRENGTH + 1}</b>. Anh/Em sẽ hỏi lại!`,
                "Tình Yêu Sẽ Chiến Thắng!");
    const modalRect = loveModal.getBoundingClientRect();
    
    let newLeft = Math.random() * (modalRect.width - 100); 
    let newTop = Math.random() * (modalRect.height - 100); 
    
    btnNo.style.position = 'absolute';
    btnNo.style.transition = 'top 0.3s, left 0.3s';
    btnNo.style.left = `${newLeft + modalRect.left}px`;
    btnNo.style.top = `${newTop + modalRect.top}px`; 
    
    btnNo.textContent = 'KHÔNG?';

    setTimeout(() => {
        
        updateModal(`Gửi đến Em, ${HER_NAME} (Từ ${MY_NAME})`, 
                    "Anh có một hàm **Love(You) return True;** không thể bị từ chối. Em có muốn là 'người yêu' của Anh không?",
                    "Xin Em, Đừng Từ Chối!");
        
        btnNo.style.position = 'relative'; 
        btnNo.style.left = 'auto';
        btnNo.style.top = 'auto';
        btnNo.style.transition = 'none';
        btnNo.textContent = 'KHÔNG (Reject) 💔';
    }, 1500);
}



function checkPassword() {
    if (passwordInput.value === CORRECT_PASSWORD) {
        errorMessage.style.display = 'none';
        showModal();
    } else {
        errorMessage.style.display = 'block';
        passwordInput.value = '';
    }
}



enterBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

btnYes.addEventListener('click', handleAccept);
btnNo.addEventListener('click', handleReject);