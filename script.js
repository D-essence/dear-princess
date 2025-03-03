document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
    }, 1500);
    
    // Age Verification
    const ageVerification = document.getElementById('age-verification');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');
    
    // Check if user has already confirmed age
    if (sessionStorage.getItem('ageVerified') === 'true') {
        ageVerification.style.display = 'none';
    }
    
    confirmYes.addEventListener('click', function() {
        sessionStorage.setItem('ageVerified', 'true');
        ageVerification.style.opacity = '0';
        setTimeout(function() {
            ageVerification.style.display = 'none';
        }, 500);
        
        // Show welcome toast
        showToast('Dear Princessへようこそ！');
    });
    
    confirmNo.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Toast notification function
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Therapist modal
    const therapistCards = document.querySelectorAll('.therapist-card');
    const therapistModal = document.getElementById('therapist-modal');
    const closeTherapistModal = document.getElementById('close-therapist-modal');
    const therapistModalTitle = document.getElementById('therapist-modal-title');
    const therapistModalContent = document.getElementById('therapist-modal-content');
    
    // Therapist data
    const therapists = {
        haruki: {
            name: '晴輝 (Haruki)',
            age: 24,
            height: 183,
            hobbies: 'ピアノ、読書',
            description: '穏やかな笑顔と知的な雰囲気が魅力のセラピスト。大学では心理学を専攻し、その知識を活かした心のケアも得意としています。会話の中で自然とリラックスできると評判です。豊富な知識と優しい手つきで、心身ともに深いリラクゼーションへと導きます。',
            message: '皆様の心と身体の緊張を解きほぐし、日常から離れた特別なひとときをご提供いたします。どうぞ安心してお任せください。'
        },
        ren: {
            name: '蓮 (Ren)',
            age: 22,
            height: 178,
            hobbies: 'ダンス、料理',
            description: '明るく爽やかな笑顔が印象的なセラピスト。ダンサーとしての経験から体の動きに対する理解が深く、筋肉の緊張を効果的にほぐします。エネルギッシュかつ繊細な施術で、心地よい疲労感と充実感を味わえます。会話も弾み、時間を忘れる癒しのひとときを提供します。',
            message: '笑顔と元気をお届けしながら、最高のリラクゼーションタイムをご提供します！疲れを忘れて、一緒に楽しいひとときを過ごしましょう。'
        },
        yuma: {
            name: '悠真 (Yuma)',
            age: 25,
            height: 180,
            hobbies: 'ギター、映画鑑賞',
            description: 'クールな表情とは裏腹に優しさ溢れる人気セラピスト。静かな佇まいに安心感があります。音楽の趣味が高じて指先の感覚が非常に繊細で、お客様の微妙な反応を感じ取りながら施術を進めていきます。心を読むような的確なアプローチで、最も効果的なケアを提供します。',
            message: '一期一会の精神で、お客様だけの特別な時間をお作りします。日常の喧騒を忘れ、深いリラクゼーションの世界へとご案内いたします。'
        },
        sho: {
            name: '翔 (Sho)',
            age: 23,
            height: 182,
            hobbies: 'スポーツ、旅行',
            description: '爽やかなスポーツマンタイプのセラピスト。元気をくれる明るい性格と、スポーツ経験から来る力強くも繊細な施術が自慢です。アスリートとしての経験を活かし、体の仕組みを熟知した効果的なアプローチで、凝り固まった筋肉を効率よくほぐします。',
            message: '健康と笑顔をモットーに、活力に満ちた施術をお届けします。お客様の心と体に元気を与えられるよう、全力でサポートいたします！'
        }
    };
    
    therapistCards.forEach(card => {
        card.addEventListener('click', function() {
            const therapistId = this.getAttribute('data-therapist');
            const therapist = therapists[therapistId];
            
            therapistModalTitle.textContent = therapist.name;
            therapistModalContent.innerHTML = `
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">プロフィール</h3>
                    <p><strong>年齢:</strong> ${therapist.age}歳</p>
                    <p><strong>身長:</strong> ${therapist.height}cm</p>
                    <p><strong>趣味:</strong> ${therapist.hobbies}</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">セラピスト紹介</h3>
                    <p>${therapist.description}</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">メッセージ</h3>
                    <p style="font-style: italic;">"${therapist.message}"</p>
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn btn-primary therapist-select-btn" data-therapist="${therapistId}">このセラピストを指名する</button>
                </div>
            `;
            
            therapistModal.style.display = 'flex';
            
            // セラピスト指名ボタンのイベントリスナーを追加
            document.querySelector('.therapist-select-btn').addEventListener('click', function() {
                const selectedTherapist = this.getAttribute('data-therapist');
                showToast(`${therapists[selectedTherapist].name}を指名しました`);
                therapistModal.style.display = 'none';
            });
            
            // スライドショーの開始
            startSlideshow();
        });
    });
    
    closeTherapistModal.addEventListener('click', function() {
        therapistModal.style.display = 'none';
    });
    
    // Terms, Privacy, Notice links
    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    const noticeLink = document.getElementById('notice-link');
    
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const noticeModal = document.getElementById('notice-modal');
    
    const closeTermsModal = document.getElementById('close-terms-modal');
    const closePrivacyModal = document.getElementById('close-privacy-modal');
    const closeNoticeModal = document.getElementById('close-notice-modal');
    
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
    });
    
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'flex';
    });
    
    noticeLink.addEventListener('click', function(e) {
        e.preventDefault();
        noticeModal.style.display = 'flex';
    });
    
    closeTermsModal.addEventListener('click', function() {
        termsModal.style.display = 'none';
    });
    
    closePrivacyModal.addEventListener('click', function() {
        privacyModal.style.display = 'none';
    });
    
    closeNoticeModal.addEventListener('click', function() {
        noticeModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === therapistModal) {
            therapistModal.style.display = 'none';
        }
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
        if (e.target === privacyModal) {
            privacyModal.style.display = 'none';
        }
        if (e.target === noticeModal) {
            noticeModal.style.display = 'none';
        }
    });
    
    // LINE button
    document.querySelector('.line-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showToast('LINE友だち追加ページへ移動します');
        // 実際のLINEリンクを設定する場合はここにURLを指定
        // window.location.href = "https://line.me/yourlink";
    });
    
    // Plan buttons
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.getAttribute('data-plan');
            let planName = '';
            
            if (plan === 'standard') planName = 'スタンダードコース';
            else if (plan === 'premium') planName = 'プレミアムコース';
            else if (plan === 'vip') planName = 'VIPコース';
            
            showToast(`${planName}を選択しました`);
            scrollToContact();
        });
    });
    
    // Helper function to scroll to contact section
    function scrollToContact() {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Slideshow functionality
    let slideIndex = 0;
    function startSlideshow() {
        slideIndex = 0;
        showSlides();
    }
    
    function showSlides() {
        let slides = document.querySelectorAll('.slide');
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        slides[slideIndex - 1].classList.add('active');
        setTimeout(showSlides, 3000); // 3秒ごとに画像を切り替え
    }
    
    // Scroll animation for elements
    function checkScroll() {
        const elements = [
            ...document.querySelectorAll('.therapist-card'),
            ...document.querySelectorAll('.plan-card'),
            ...document.querySelectorAll('.contact-method')
        ];
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('show');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    // Handle escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            therapistModal.style.display = 'none';
            termsModal.style.display = 'none';
            privacyModal.style.display = 'none';
            noticeModal.style.display = 'none';
        }
    });
    
    // ウィンドウのロード完了時にトースト表示
    window.addEventListener('load', function() {
        setTimeout(function() {
            showToast('サイトが正常に読み込まれました');
        }, 2000);
    });
});

// グローバルスコープでtoast表示関数を定義（外部からも呼び出せるようにする）
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}
