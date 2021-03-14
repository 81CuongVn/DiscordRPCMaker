const fs = require('fs');
const os = require('os');
const RPC = require('discord-rpc')

const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming/drpcm/' : '/.config/drpcm/'}`

let clientID = 0

function validateurl (str) {
	const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
	return regexp.test(str)
}

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("test").addEventListener("click", () => {
    //alert("Yo")
    const myNotification = new Notification("Discord RPC Maker", {
      body: "Your presence has started.",
      icon: "assets/icon.png",
      timeoutType: "default",
    });
  });

  //clientid enabling
  document.querySelector(".client-id-enabler").addEventListener("keyup", async (e) => {
    let inp = document.querySelector(".client-id-enabler")
    let braincell = document.querySelectorAll(".enable-on-clientid")
    braincell.forEach((item, i, arr) => {
      item.disabled = true;
    })
    if (inp.value !== "" && inp.value.toString().length > 17 && isNaN(parseInt(inp.value)) == false) {
      let response = await fetch(`https://discord.com/api/oauth2/applications/${inp.value.toString()}/assets`)
      if (response.ok) {
        let options = await fetch(`https://discord.com/api/oauth2/applications/${inp.value.toString()}/assets`).then(options => options.json())
        clientid = parseInt(inp.value)//get clientid and store it
        console.log(options)
        braincell.forEach((item, i, arr) => {
          item.removeAttribute("disabled")
        })
        imageinputs = document.querySelectorAll("#small-image-list, #large-image-list")
        imageinputs.forEach((item, i, arr) => {
          htmll = `<option image-id="none">None</option>` //i'll feed this to the innerHTML of the datalist
          options.forEach((opt, index, array) => {
            htmll += `<option image-id="${opt.id}">${opt.name}</option>` //i'll add a dummy attribute
          })
          item.innerHTML = htmll
        })
      }
    }
  })

  //button enabling
  document.getElementById("button1-enable").addEventListener("change", () => {
    if (document.getElementById("button1-enable").checked) {
      //enable all buttons
      inps = document.querySelector(".button1")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });
      document.getElementById('button2-enable').removeAttribute('disabled')
      document.getElementById("preview-button-1").classList.remove("initially-hidden")
      document.getElementById("button1-input-name").addEventListener("keyup", (event) => {document.getElementById("preview-button-1").innerHTML = event.target.value})
    } else {
      //disable buttons
      inps = document.querySelector(".button1")
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });

      button2enable = document.getElementById('button2-enable')
      document.getElementById("preview-button-1").classList.add("initially-hidden")
      if (button2enable.checked == true){button2enable.click()}
      button2enable.disabled = true;

      try {
        document.getElementById("button1-input-name").removeEventListener("keyup", (event) => {document.getElementById("preview-button-1").innerHTML = event.target.value})
        document.getElementById("button2-input-name").removeEventListener("keyup", (event) => {document.getElementById("preview-button-2").innerHTML = event.target.value})
      } catch(e) {}
    }
  });
  document.getElementById("button2-enable").addEventListener("change", () => {
    if (document.getElementById("button2-enable").checked) {
      //enable second button
      inps = document.querySelector(".button2")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });
      document.getElementById("preview-button-2").classList.remove("initially-hidden")
      document.getElementById("button2-input-name").addEventListener("keyup", (event) => {document.getElementById("preview-button-2").innerHTML = event.target.value})
    } else {
      inps = document.querySelector(".button2")
      //disable second button
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });
      document.getElementById("preview-button-2").classList.add("initially-hidden")
      document.getElementById("button2-input-name").removeEventListener("keyup", (event) => {document.getElementById("preview-button-2").innerHTML = event.target.value})
    }
  });

  document.getElementById("description-input-1").addEventListener("change", () => {
    document.getElementById("description-input-1").addEventListener("keyup", (event) => {document.getElementById("preview-description-1").innerHTML = event.target.value})    
  });

  document.getElementById("description-input-2").addEventListener("change", () => {
    document.getElementById("description-input-2").addEventListener("keyup", (event) => {document.getElementById("preview-description-2").innerHTML = event.target.value})    
  });

  //fix win outline
  if (process.platform === "win32") {
    document.querySelector(".zoom").setAttribute("style", "-webkit-text-stroke-width: 0.01em")
  }
});
