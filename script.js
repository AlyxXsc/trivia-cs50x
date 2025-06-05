// TODO: Add code to check answers to questions
// Store global variables.
let prevBtn;
let userOptVal;
const ans = {
        "mcq" : {
            "0" : "mcq1-radio1", 
            "1" : "mcq2-radio3", 
            "2" : "mcq3-radio1", 
            "3" : "mcq4-radio2", 
            "4" : "mcq5-radio1"
        }, 
        "frq" : {
            "0" : "service", 
            "1" : "unix", 
            "2" : "ghidra", 
            "3" : "linux", 
            "4" : "wozniak"
        }
    };

    function showResult() {}

document.addEventListener("click", (event) => {
    // Declare variables and store selected button in it.
    const btnId = event.target.id;
    const curBtn = document.querySelector(`#${btnId}`);
    const localName = event.target.localName;
    const linkedRadioId = `#${btnId.slice(0, 11)}`;

    // Derive the id of hidden radio button attached to that button and click it.
    if (localName == "button" && `${btnId.slice(0, 3)}` == "mcq") {
        const linkedRadio = document.querySelector(linkedRadioId);
        linkedRadio.click();
    }

    // Click event of Hidden Radio button
    else if(localName != "") {
        console.log(`Successfully clicked identifier "${localName}".`);
        if (localName == "input") {
            if (event.target.type == "radio") {
                console.log("Button->Radio click successfully initialized.");

                // Extract Id of hidden empty result display element, toggle its visibility and 
                // store User Option Value into global variable "userOptVal".
                const ansBlockId = `#${event.target.id.slice(0, 4)}-ans-hidden`;
                const ansBlock = document.querySelector(ansBlockId);
                if (event.target.value == "cor") {
                    ansBlock.innerHTML = "Correct";
                    ansBlock.classList.replace(`${ansBlock.classList[0]}`, "cor-ans");
                    ansBlock.scrollTo();
                    userOptVal = event.target.value;
                }
                else {
                    ansBlock.innerHTML = "Incorrect";
                    ansBlock.classList.replace(`${ansBlock.classList[0]}`, "inc-ans");
                    ansBlock.scrollTo();
                    userOptVal = event.target.value;
                }
                console.log("Successfully changed element class");
            }
        }
        event.preventDefault();
    }
    else {
        console.log("Failed to detect identifier local Name.");
        event.preventDefault();
    }
    if (localName == "button") {
        // Change style of selected button and 
        // store current selection in global variable "prevBtn" to be deselected on next selection.
        if (event.target.id.slice(0, 3) == "mcq") {

            const curBtnIndex = Number(`${curBtn.id.slice(10, 11)}`);
            let nxtBtnIndex = 1;
            for (i = 0; i < 4; i++) {
                const nxtBtn = document.querySelector(`#${curBtn.id.slice(0, 10)}${nxtBtnIndex}-btn`);
            if (nxtBtn.classList[0] != "btn-unselected") {
                console.log(`Successfully deselected element with identiier "#${nxtBtn.id}"`);
                nxtBtn.classList.replace(`${nxtBtn.classList[0]}`, "btn-unselected");
                if (nxtBtnIndex == 4) {
                    console.log(`Skipping index "${nxtBtnIndex}"`);
                    nxtBtnIndex = 0;
                }
            }
            nxtBtnIndex++;
        }
        }
        else if (event.target.id.slice(6, 9) == "frq") {
            if (event.target.type == "submit") {
                const uAnsTxtId = `${event.target.id.slice(6, 10)}`;
                const uAnsTxt = document.querySelector(`#${uAnsTxtId}-text`);
                const AnsTxt = ans.frq[Number(uAnsTxtId.slice(3, 4)) - 1];
                if (uAnsTxt.value.toLowerCase() == AnsTxt) {
                    console.log("User text answer is correct");
                    uAnsTxt.classList.replace(`${uAnsTxt.classList[0]}`, "frq-textbox-cor");
                    const ansBlock = document.querySelector(`#${uAnsTxtId}-ans-hidden`);
                    ansBlock.innerHTML = "Correct";
                    ansBlock.classList.replace(`${ansBlock.classList[0]}`, "cor-ans");
                    ansBlock.scrollTo();
                }
                else if (uAnsTxt.value != "") {
                    console.log("User text answer is incorrect");
                    uAnsTxt.classList.replace(`${uAnsTxt.classList[0]}`, "frq-textbox-inc");
                    const ansBlock = document.querySelector(`#${uAnsTxtId}-ans-hidden`);
                    ansBlock.innerHTML = "Incorrect";
                    ansBlock.classList.replace(`${ansBlock.classList[0]}`, "inc-ans");
                    ansBlock.scrollTo();
                    
                }
                else {
                    console.log("User text field is empty");
                    uAnsTxt.classList.replace(`${uAnsTxt.classList[0]}`, "frq-textbox-inc");
                    const ansBlock = document.querySelector(`#${uAnsTxtId}-ans-hidden`);
                    ansBlock.innerHTML = "Please fill out the input field!";
                    ansBlock.classList.replace(`${ansBlock.classList[0]}`, "inc-ans");
                    ansBlock.scrollTo();
                }
            }
        }
        switch (userOptVal) {
            case "cor":
                curBtn.classList.replace(`${curBtn.classList[0]}`, "btn-selected-cor");
                break;
                
            case "inc":
                curBtn.classList.replace(`${curBtn.classList[0]}`, "btn-selected-inc");
                break;
        }
        prevBtn = curBtn;
    }
});