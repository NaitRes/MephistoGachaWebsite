const SingleDrawBtn = document.getElementById("SingleDrawBtn");
const DrawBtn = document.getElementById("DrawBtn");
const container = document.getElementById("cardContainer");
const spinner = document.getElementById("gacha-spinner");

const SoundOfClick = document.getElementById("SoundOfClick");
const SoundOfHover = document.getElementById("SoundOfHover");
const SoundOfN = document.getElementById("SoundOfN");
const SoundOfR = document.getElementById("SoundOfR");
const SoundOfSR = document.getElementById("SoundOfSR");
const SoundOfSSR = document.getElementById("SoundOfSSR");
const SoundOfUR = document.getElementById("SoundOfUR");
const SoundOfSP = document.getElementById("SoundOfSP");
const ButtonWrapper = document.getElementById("ButtonWrapper");
const BGM = document.getElementById("BGM");
let BgmPlayed = false;


SingleDrawBtn.addEventListener("click", () => DrawCards(1));
DrawBtn.addEventListener("click", () => DrawCards(10));

// 新增：按鈕hover音效
SingleDrawBtn.addEventListener("mouseenter", () => {
    SoundOfHover.currentTime = 0;
    SoundOfHover.play();
});
DrawBtn.addEventListener("mouseenter", () => {
    SoundOfHover.currentTime = 0;
    SoundOfHover.play();
});


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

async function DrawCards(count) {
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

        //await delay(300); 拉長出牌速度間距Test

        let waitTime = 300;
        //if (rarity === "UR" || rarity === "SP") waitTime = 1000;
        await delay(waitTime);
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

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
} //卡牌名稱首字大寫Test

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

    /*const card = `
    <img src="${meme.url}" alt="meme">
    <div class="rarity-label">${rarity} ｜ ${meme.title}<br><small>${msg[rarity]}</small></div>
    <div class="rarity-label">${rarity} ｜ ${capitalizeFirstLetter(meme.title)}<br><small>${msg[rarity]}</small></div>
  `; Test*/

    // 如果 meme.title 是 undefined 或空字串，就用 "Waifu" 替代
    const name = meme.title || "Waifu";//Test

    const card = `
    <img src="${meme.url}" alt="Waifu">
    <div class="rarity-label">${rarity} ｜ ${capitalizeFirstLetter(name)}<br><small>${msg[rarity]}</small></div>
`; //Test

    col.innerHTML = card;
    container.appendChild(col);

    // 抽卡時播放稀有度音效（如果你想保留原本這個功能）
    //if (rarity === "N") SoundOfN.play(); Test
    //if (rarity === "R") SoundOfR.play(); Test
    //if (rarity === "SR") SoundOfSR.play(); Test
    //if (rarity === "SSR") SoundOfSSR.play(); Test
    //if (rarity === "UR") SoundOfUR.play(); Test
    //if (rarity === "SP") SoundOfSP.play(); Test

    if (rarity === "N") {
        SoundOfN.currentTime = 0;
        SoundOfN.play();
    }
    if (rarity === "R") {
        SoundOfR.currentTime = 0;
        SoundOfR.play();
    }
    if (rarity === "SR") {
        SoundOfSR.currentTime = 0;
        SoundOfSR.play();
    }
    if (rarity === "SSR") {
        SoundOfSSR.currentTime = 0;
        SoundOfSSR.play();
    }
    if (rarity === "UR") {
        SoundOfUR.currentTime = 0;
        SoundOfUR.play();
    }
    if (rarity === "SP") {
        SoundOfSP.currentTime = 0;
        SoundOfSP.play();
    }


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

