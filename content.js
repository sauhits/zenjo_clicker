// content.js の一番上に追加: poyoyon3アニメーションのスタイルを動的に挿入
const style = document.createElement("style");
style.textContent = `
.poyoyon3-animation {
  animation: poyoyon3 2.5s ;
  opacity: 1; /* アニメーションが適用されると常に不透明 */
}

@keyframes poyoyon3 {
  0%, 40% {
    transform: skew(0deg, 0deg);
  }
  5% {
    transform: skew(5deg, 5deg);
  }
  10% {
    transform: skew(-4deg, -4deg);
  }
  15% {
    transform: skew(3deg, 3deg);
  }
  20% {
    transform: skew(-2deg, -2deg);
  }
  25% {
    transform: skew(1deg, 1deg);
  }
  30% {
    transform: skew(-0.6deg, -0.6deg);
  }
  35% {
    transform: skew(0.3deg, 0.3deg);
  }
}
`;
document.head.appendChild(style);

const adBanner = document.createElement("div");
// 最初から最終的な表示位置に設定し、アニメーションなしで表示
adBanner.style.position = "fixed";
adBanner.style.bottom = "10px"; // 下部から10px上に配置
adBanner.style.left = "50%"; // 左端から50%の位置
adBanner.style.transform = "translateX(-50%)"; // 要素の幅の半分だけ左にずらして中央揃え
adBanner.style.width = "30%";
adBanner.style.backgroundColor = "rgb(35, 134, 54)";
adBanner.style.border = "5px solid #ffffff"; // 白い枠線を追加
adBanner.style.padding = "10px";
adBanner.style.textAlign = "center";
adBanner.style.zIndex = "99999";
adBanner.style.opacity = "1"; // 最初から完全に不透明
adBanner.style.borderRadius = "15px"; // 角を丸くする
adBanner.classList.add("poyoyon3-animation"); // 作成時にアニメーションクラスを適用

const adContent = document.createElement("div");
const imageUrl = chrome.runtime.getURL("/images/github_zenjo.png");
adContent.innerHTML = `
  <a href="https://github.com/sauhits/zenjo_clicker" target="_blank">
    <img src="${imageUrl}" alt="My Ad" style="max-width:100%; height:auto; border-radius: 10px;">
  </a>
`;
adBanner.appendChild(adContent);

const closeButtonContainer = document.createElement("div");
closeButtonContainer.style.position = "absolute";
closeButtonContainer.style.top = "5px";
closeButtonContainer.style.right = "10px";
const closeButton = document.createElement("button");
closeButton.innerHTML = "&times;";
closeButton.style.fontSize = "20px";
closeButton.style.border = "none";
closeButton.style.backgroundColor = "transparent";
closeButton.style.color = "#ffffff"; // 閉じるボタンの文字色を白に
closeButton.style.cursor = "pointer";
closeButton.onclick = () => {
  adBanner.remove(); // クリックでバナーをすぐに削除
};
closeButtonContainer.appendChild(closeButton);
adBanner.appendChild(closeButtonContainer);
closeButtonContainer.style.display = "none"; // 最初は非表示

document.body.appendChild(adBanner);

// 5秒後に閉じるボタンを表示
setTimeout(() => {
  closeButtonContainer.style.display = "block";
}, 5000);

const blueScreenSelector =
  "#userInfomation > div.index-main-visual-user-picture";
const imgElement = document.querySelector(blueScreenSelector);
if (imgElement) {
  console.log("対象のimgタグが見つかりました:", imgElement);

  imgElement.addEventListener("click", async () => {
    if (document.getElementById("bluescreen-host-container")) {
      console.log("既にオーバーレイが表示されています。");
      return;
    }
    try {
      await document.documentElement.requestFullscreen();

      const hostElement = document.createElement("div");
    hostElement.id = "bluescreen-host-container";
    document.documentElement.appendChild(hostElement);

    const shadowRoot = hostElement.attachShadow({ mode: "open" });
    const shadowContent = `
        <style>
            /* * :host スタイル
             * オーバーレイのコンテナ自体を画面いっぱいに広げ、最前面に配置
             */
            :host {
                position: fixed; /* 画面に固定 */
                top: 0;
                left: 0;
                width: 100vw;    /* 画面幅 100% */
                height: 100vh;   /* 画面高さ 100% */
                
                /* z-index の最大値 (多くのブラウザで 2147483647) 
                   ほぼ確実に最前面に表示されます */
                z-index: 2147483647; 
                
                /* BlueScreen の基本スタイル */
            background-color: #0094ff;
            /* Windows BSOD Blue */
            color: white;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            }
            
        html,
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #0094ff;
            /* Windows BSOD Blue */
            color: white;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            overflow: hidden;
        }

        .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 800px;
        }

        .face {
            font-size: 100px;
            line-height: 0.8;
            margin-bottom: 40px;
        }

        .text {
            font-size: 22px;
            font-weight: 300;
            line-height: 1.4;
            margin-bottom: 40px;
        }

        .progress {
            font-size: 20px;
            font-weight: 300;
            margin-bottom: 60px;
        }

        .bottom {
            display: flex;
            align-items: flex-start;
            gap: 20px;
        }

    .qr {
      width: 100px;
      height: 100px;
      display: inline-block;
      background: #ffffff;
      border-radius: 6px;
      /* for <img> elements: ensure the image fits the box */
      object-fit: cover;
    }

        .info {
            font-size: 14px;
            line-height: 1.6;
            max-width: 600px;
        }

        .info a {
            color: #fff;
            text-decoration: none;
        }

        .info a:hover {
            text-decoration: underline;
        }

        .stop {
            display: block;
            margin-top: 6px;
        }
    </style>
        
        <div class="container wrapper">
        <div class="face">:(</div>
        <div class="text">
            Your PC ran into a problem and needs to restart.<br>
            We're just collecting some error info, and then we'll restart for you.
        </div>
        <div class="progress">9% complete</div>

        <div class="bottom">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ja.wikipedia.org/wiki/%E3%82%B8%E3%83%A7%E3%83%BC%E3%82%AF" class="qr" alt="QR code">
            <div class="info">
                For more information about this issue and possible fixes, visit
                <a href="https://www.windows.com/stopcode">https://www.windows.com/stopcode</a><br><br>
                If you call a support person, give them this info:<br>
                <span class="stop">Stop code: CRITICAL_PROCESS_DIED</span>
            </div>
        </div>
    </div>
    `;

    shadowRoot.innerHTML = shadowContent;

    const closeButton = shadowRoot.querySelector("#bluescreen-close-btn");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        hostElement.remove();
        console.log("オーバーレイを閉じました。");
      });
    }

    console.log("Shadow DOM オーバーレイが表示されました。");

    } catch (e) {
      console.log("フルスクリーンモードの切り替えに失敗しました:", e);
    }
  });
} else {
  console.log(
    "対象のimgタグが見つかりませんでした。 (セレクタ: " +
      blueScreenSelector +
      ")"
  );
}
