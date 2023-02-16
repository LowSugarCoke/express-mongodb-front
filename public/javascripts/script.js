// 獲取表單元素和其他 HTML 元素
const authForm = document.getElementById('auth-form');
const toggleAuth = document.getElementById('toggle-auth');
const submitButton = document.getElementById('submit-button');

// 標識當前操作是否是註冊操作
let isRegister = true;

// 監聽切換登入或註冊鏈結的點擊事件
toggleAuth.addEventListener('click', event => {
    event.preventDefault();
    isRegister = !isRegister;
    if (isRegister) {
        submitButton.textContent = '註冊';
        toggleAuth.textContent = '已經有帳號了？點此登入';
    } else {
        submitButton.textContent = '登入';
        toggleAuth.textContent = '還沒有帳號？點此註冊';
    }
});

// 監聽表單提交事件
authForm.addEventListener('submit', async event => {
    event.preventDefault();

    // 從表單中獲取用戶名和密碼
    const username = authForm.username.value;
    const password = authForm.password.value;

    if (isRegister) {
        alert("申請註冊");
        // 如果是註冊，則向後端發送 POST 請求
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('註冊失敗');
            }

            alert('註冊成功');
        } catch (error) {
            alert(error.message);
        }
    } else {
        // 如果是登入，則向後端發送 GET 請求
        try {
            const response = await fetch(`/api/login?username=${username}&password=${password}`);

            if (!response.ok) {
                throw new Error('登入失敗');
            }

            alert('登入成功');
        } catch (error) {
            alert(error.message);
        }
    }
});
