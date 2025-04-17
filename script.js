let boxes = document.querySelectorAll(".box");
        let resetBtn = document.querySelector("#R-btn");
        let newGameBtn = document.querySelector("#new-btn");
        let msgContainer = document.querySelector(".msg-container");
        let msg = document.querySelector("#msg");

        let turnO = true;

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        const resetGame = () => {
            turnO = true;
            enableBoxes();
            msgContainer.classList.add("hide");
        };

        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (turnO) {
                    box.innerText = "O";
                    turnO = false;
                } else {
                    box.innerText = "X";
                    turnO = true;
                }
                box.disabled = true;
                checkWinner();
            });
        });

        const disableBoxes = () => {
            boxes.forEach((box) => (box.disabled = true));
        };

        const enableBoxes = () => {
            boxes.forEach((box) => {
                box.disabled = false;
                box.innerText = "";
            });
        };

        const showWinner = (winner) => {
            msg.innerText = `Congratulations, Winner is ${winner}`;
            msgContainer.classList.remove("hide");
            disableBoxes();
        };

        const checkWinner = () => {
            for (let pattern of winPatterns) {
                let pos1Val = boxes[pattern[0]].innerText;
                let pos2Val = boxes[pattern[1]].innerText;
                let pos3Val = boxes[pattern[2]].innerText;

                if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    return;
                }
            }
        };

        newGameBtn.addEventListener("click", resetGame);
        resetBtn.addEventListener("click", resetGame);