const singleDrawBtn = document.getElementById("singleDrawBtn");
const drawBtn = document.getElementById("drawBtn");
const container = document.getElementById("cardContainer");
const spinner = document.getElementById("gacha-spinner");

const SoundOfClick = document.getElementById("SoundOfClick");
const SoundOfN = document.getElementById("SoundOfN");
const SoundOfR = document.getElementById("SoundOfR");
const SoundOfSR = document.getElementById("SoundOfSR");
const SoundOfSSR = document.getElementById("SoundOfSSR");
const SoundOfUR = document.getElementById("SoundOfUR");
const SoundOfSP = document.getElementById("SoundOfSP");
const ButtonWrapper = document.getElementById("ButtonWrapper");
const BGM = document.getElementById("BGM");
let BgmPlayed = false;


singleDrawBtn.addEventListener("click", () => drawCards(1));
drawBtn.addEventListener("click", () => drawCards(10));

/*async function drawCards(count) {
    if (!bgmPlayed) {
        BGM.play();
        bgmPlayed = true;
    }
    SoundOfClick.play();
    container.innerHTML = "";
    spinner.style.display = "block";

    for (let i = 0; i < count; i++) {
        const meme = await fetch("https://meme-api.com/gimme").then(res => res.json());
        const rarity = getRarity();
        displayCard(meme, rarity);
        await delay(200);
    }

    spinner.style.display = "none";

    // 抽卡動畫結束後綁定hover播放音效
    bindCardHoverSound();
}*/

async function drawCards(count) {
    // Test!!!!!!!!!✅ 第一次抽卡時讓按鈕從中間移到上方
    if (!ButtonWrapper.classList.contains("To-Top")) {
        ButtonWrapper.classList.add("To-Top");
    }

    if (!BgmPlayed) {
        BGM.play();
        BgmPlayed = true;
    }

    SoundOfClick.play();
    container.innerHTML = "";
    spinner.style.display = "block";

    for (let i = 0; i < count; i++) {
        //const meme = await fetch("https://meme-api.com/gimme").then(res => res.json());
        const meme = await fetch("https://api.waifu.pics/sfw/waifu").then(res => res.json());
        const rarity = getRarity();
        displayCard(meme, rarity);
        await delay(200);
    }

    spinner.style.display = "none";
    bindCardHoverSound();
}

function getRarity() {
    const rand = Math.random();
    if (rand < 0.02) return "SP";
    if (rand < 0.10) return "UR";
    if (rand < 0.20) return "SSR";
    if (rand < 0.35) return "SR";
    if (rand < 0.60) return "R";
    return "N";
}

function displayCard(meme, rarity) {
    const col = document.createElement("div");
    col.className = "card-box r-" + rarity + " col-md-3";

    const msg = {
        N: "ノーマル",
        R: "レア!",
        SR: "スーパーレア!",
        SSR: "超激レア!!!",
        UR: "伝説レア!!!!✨",
        SP: "🌈究極神引き!!!🌈"
    };

    const card = `
    <img src="${meme.url}" alt="meme">
    <div class="rarity-label">${rarity} ｜ ${meme.title}<br><small>${msg[rarity]}</small></div>
  `;

    col.innerHTML = card;
    container.appendChild(col);

    // 抽卡時播放稀有度音效（如果你想保留原本這個功能）
    if (rarity === "N") SoundOfN.play();
    if (rarity === "R") SoundOfR.play();
    if (rarity === "SR") SoundOfSR.play();
    if (rarity === "SSR") SoundOfSSR.play();
    if (rarity === "UR") SoundOfUR.play();
    if (rarity === "SP") SoundOfSP.play();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*function bindCardHoverSound() {
    const cards = container.querySelectorAll(".card-box");

    cards.forEach(card => {
        let played = false;
        card.addEventListener("mouseenter", () => {
            if (played) return; // 避免重複播放
            played = true;

            if (card.classList.contains("r-SSR")) {
                SoundOfSSR.currentTime = 0;
                SoundOfSSR.play();
            } else if (card.classList.contains("r-UR")) {
                SoundOfUR.currentTime = 0;
                SoundOfUR.play();
            } else if (card.classList.contains("r-SP")) {
                SoundOfSP.currentTime = 0;
                SoundOfSP.play();
            }
            // 其他稀有度可擴充
        });
    });
}Test*/

function bindCardHoverSound() {
    const cards = container.querySelectorAll(".card-box");

    cards.forEach(card => {
        let played = false;

        card.addEventListener("mouseenter", () => {
            if (played) return; // 已播放過，這次不播
            played = true;

            if (card.classList.contains("r-N")) {
                SoundOfN.currentTime = 0;
                SoundOfN.play();
            } else if (card.classList.contains("r-R")) {
                SoundOfR.currentTime = 0;
                SoundOfR.play();
            } else if (card.classList.contains("r-SR")) {
                SoundOfSR.currentTime = 0;
                SoundOfSR.play();
            } else if (card.classList.contains("r-SSR")) {
                SoundOfSSR.currentTime = 0;
                SoundOfSSR.play();
            }else if (card.classList.contains("r-UR")) {
                SoundOfUR.currentTime = 0;
                SoundOfUR.play();
            } else if (card.classList.contains("r-SP")) {
                SoundOfSP.currentTime = 0;
                SoundOfSP.play();
            }
            // 可以依需求繼續擴充其他稀有度的音效
        });

        card.addEventListener("mouseleave", () => {
            played = false; // 滑出時重置，讓下次滑入能再播放
        });
    });
}

/*let bgmPlayed = false;

window.addEventListener("mousemove", () => {
    if (!bgmPlayed) {
        BGM.play();
        bgmPlayed = true;
    }
});*/

