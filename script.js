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
        
        // 削除：ウェルカムトーストを表示しないようにする
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
    
    // Toast notification function - 完全に無効化
    function showToast(message) {
        // トースト表示を無効化
        return;
    }
    
    // Fixed Contact Banner 
    document.querySelectorAll('.banner-btn').forEach(btn => {
        if (btn.classList.contains('contact-btn')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        } else if (btn.classList.contains('line-btn')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('LINE友だち追加ページへ移動します');
                // 実際のLINEリンクを設定する場合はここにURLを指定
                // window.location.href = "https://line.me/yourlink";
            });
        }
    });
    
    // Therapist modal
    const therapistCards = document.querySelectorAll('.therapist-card');
    const therapistModal = document.getElementById('therapist-modal');
    const closeTherapistModal = document.getElementById('close-therapist-modal');
    const therapistBackBtn = document.getElementById('therapist-back-btn');
    const therapistModalTitle = document.getElementById('therapist-modal-title');
    const therapistModalContent = document.getElementById('therapist-modal-content');
    const therapistModalImage = document.getElementById('therapist-modal-image');
    
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
            
            // モーダル画像のパスを設定
            therapistModalImage.style.backgroundImage = `url('images/${therapistId}m.jpg')`;
            
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
                    <button class="btn btn-primary check-schedule-btn" data-therapist="${therapistId}">出勤情報を確認する</button>
                </div>
            `;
            
            therapistModal.style.display = 'flex';
            
            // セラピスト出勤確認ボタンのイベントリスナーを追加
            document.querySelector('.check-schedule-btn').addEventListener('click', function() {
                closeTherapistModalFunc();
                // Xセクションへスクロール
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
            });
            
            // Scroll to top of modal content
            therapistModal.querySelector('.modal-body').scrollTop = 0;
        });
    });
    
    // Function to close therapist modal
    function closeTherapistModalFunc() {
        therapistModal.style.display = 'none';
    }
    
    // Close therapist modal events
    closeTherapistModal.addEventListener('click', closeTherapistModalFunc);
    therapistBackBtn.addEventListener('click', closeTherapistModalFunc);
    
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
            closeTherapistModalFunc();
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
    
    // X button
    document.querySelector('.x-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showToast('X（旧Twitter）のフォローページへ移動します');
        // 実際のXリンクを設定する場合はここにURLを指定
        // window.location.href = "https://twitter.com/yourlink";
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
            closeTherapistModalFunc();
            termsModal.style.display = 'none';
            privacyModal.style.display = 'none';
            noticeModal.style.display = 'none';
        }
    });
});

// グローバルスコープでtoast表示関数を定義（外部からも呼び出せるようにする）
function showToast(message) {
    // トースト表示を無効化
    return;
}

// カルーセル機能 - 改良版
    const carousel = document.querySelector('.therapists-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const therapistCards = document.querySelectorAll('.therapist-card');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (carousel && prevBtn && nextBtn && therapistCards.length > 0) {
        let currentIndex = 0;
        let cardsPerView = getCardsPerView();
        let maxIndex = Math.max(0, therapistCards.length - cardsPerView);
        
        // ウィンドウサイズに応じて表示カード数を取得
        function getCardsPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }
        
        // カードの位置を中央揃えするための初期化
        function setupCardLayout() {
            // カードの幅を取得（マージンを含む）
            let cardWidth;
            const containerWidth = carousel.offsetWidth;
            
            if (window.innerWidth <= 768) {
                cardWidth = containerWidth * 0.9; // モバイルでは90%幅
            } else if (window.innerWidth <= 992) {
                cardWidth = containerWidth / 2 - 40; // タブレットでは半分
            } else {
                cardWidth = containerWidth / 3 - 40; // PCでは3分の1
            }
            
            // 各カードの幅を設定
            therapistCards.forEach(card => {
                card.style.width = `${cardWidth}px`;
            });
        }
        
        // インジケーターの作成
        function createIndicators() {
            indicatorsContainer.innerHTML = '';
            const totalIndicators = maxIndex + 1;
            
            for (let i = 0; i < totalIndicators; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (i === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', () => {
                    goToSlide(i);
                });
                
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        // スライド移動関数
        function goToSlide(index) {
            if (index < 0) index = 0;
            if (index > maxIndex) index = maxIndex;
            
            currentIndex = index;
            
            // カードの実際の幅（含マージン）を取得
            const cardRect = therapistCards[0].getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardMargin = parseInt(window.getComputedStyle(therapistCards[0]).marginRight) || 20;
            const fullCardWidth = cardWidth + (cardMargin * 2);
            
            // 中央揃えのための移動量を計算
            const offset = currentIndex * fullCardWidth;
            carousel.style.transform = `translateX(-${offset}px)`;
            
            // インジケーター更新
            document.querySelectorAll('.indicator').forEach((ind, i) => {
                ind.classList.toggle('active', i === currentIndex);
            });
            
            // アクティブなカードを強調
            therapistCards.forEach((card, i) => {
                const isActive = i >= currentIndex && i < currentIndex + cardsPerView;
                card.style.opacity = isActive ? '1' : '0.7';
                card.style.transform = isActive ? 'scale(1)' : 'scale(0.95)';
            });
        }
        
        // ボタンイベントリスナー
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
        
        // リサイズ時の処理
        window.addEventListener('resize', () => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                maxIndex = Math.max(0, therapistCards.length - cardsPerView);
                
                // レイアウトを再設定
                setupCardLayout();
                createIndicators();
                
                // 現在のインデックスが新しい最大値を超えていたら調整
                if (currentIndex > maxIndex) {
                    goToSlide(maxIndex);
                } else {
                    goToSlide(currentIndex); // 位置の再計算
                }
            }
        });
        
        // スワイプ対応（モバイル向け）
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            // スマホサイズに応じてスワイプ感度調整
            const swipeThreshold = window.innerWidth < 480 ? 30 : 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // 左スワイプ
                goToSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // 右スワイプ
                goToSlide(currentIndex - 1);
            }
        }
        
        // キーボード操作対応
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentIndex + 1);
            }
        });
        
        // 初期化
        setupCardLayout();
        createIndicators();
        goToSlide(0); // 初期状態を適用
    }
