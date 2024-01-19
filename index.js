var container = document.querySelectorAll(".container")[0]

for(var i = 0; i < 52; i++){
    var kartu = document.createElement("div")
    kartu.className = "kartu"
    container.appendChild(kartu)
}

var deck = []
function buatDeck(){
    var simbol = ["♠","♥","♣","♦"]
    var angka = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
    
    for(var x = 0; x < 4; x++){
        for(var y = 0; y < 13; y++){
            deck.push(angka[y] + simbol[x] + "<span>" + simbol[x] + "</span>")
        }
    }

    var kartu = document.getElementsByClassName("kartu")
    for(var i = 0; i < 52; i++){
        kartu[i].innerHTML = deck[i]
        kartu[i].style.zIndex = i

        if(deck[i][deck[i].length-8] == "♠" || deck[i][deck[i].length-8] == "♣"){
            kartu[i].style.color = "black"
        } else {
            kartu[i].style.color = "red"
        }
    }
}

buatDeck()


var kartu = document.getElementsByClassName("kartu")
var submitBtn = document.querySelectorAll(".submit-btn")[0]

function klikkartu(){
    var indexdeck = deck.indexOf(this.innerHTML)
    if(kartu[indexdeck].className == "kartu clicked"){
        kartu[indexdeck].classList.remove("clicked")
    } else {
        kartu[indexdeck].classList.add("clicked") 
    }
}

for(var i = 0; i < 52; i++){
    kartu[i].onclick = klikkartu
}


var kartupemain = []
function submit(){
    for(var i = 0; i < 52; i++){
        if(kartu[i].className == "kartu clicked"){
            kartupemain.push(kartu[i].innerHTML)
        }
    }

    if(kartupemain.length != 13){
        alert("Pastikan jumlah kartu yang anda pilih sebanyak 13")
        kartupemain = []
    }
    console.log(kartupemain)
}

// MEMBUAT LOGIKA ROBOT, terlepas dari fungsi DOM
// Setelah mendapatkan array berisi kartu pilihan pemain, langkah selanjutnya adalah :
// 1. Buatlah fungsi untuk mencari seluruh kombinasi yang mungkin dibuat
// 2. Buatlah fungsi untuk mengidenfikasi nilai dari setiap kombinasi
// 3. Buatlah fungsi untuk mencari nilai tertinggi dari kombinasi yang mungkin dibuat




// fungsi untuk mencari seluruh kombinasi kartu yang bisa dibuat, untuk capsa ada 72.072 kombinasi, ada di array cardComb
var cardComb = []
var tempArrWrap = []
var tempArr1 = []
var tempArr2 = []
var tempArr3 = []
function findAllCombination(){
    for(var i = 0; i < 9; i++){
        for(var j = i + 1; j < 10; j++){
            for(var k = j + 1; k < 11; k++){
                for(var l = k + 1; l < 12; l++){
                    for(var m = l + 1; m < 13; m++){
                        tempArr1.push(kartupemain[i])
                        tempArr1.push(kartupemain[j])
                        tempArr1.push(kartupemain[k])
                        tempArr1.push(kartupemain[l])
                        tempArr1.push(kartupemain[m])
                        
                        var kartupemainModified = []
                        
                        for(var q = 0; q < kartupemain.length; q++){
                            var abc = tempArr1.indexOf(kartupemain[q])
                            if(abc == -1){
                                kartupemainModified.push(kartupemain[q])
                            }
                        }

                        for(var a = 0; a < 4; a++){
                            for(var b = a + 1; b < 5; b++){
                                for(var c = b + 1; c < 6; c++){
                                    for(var d = c + 1; d < 7; d++){
                                        for(var e = d + 1; e < 8; e++){
                                            tempArr2.push(kartupemainModified[a])
                                            tempArr2.push(kartupemainModified[b])
                                            tempArr2.push(kartupemainModified[c])
                                            tempArr2.push(kartupemainModified[d])
                                            tempArr2.push(kartupemainModified[e])


                                            for(var r = 0; r < kartupemainModified.length; r++){
                                                var abc = tempArr2.indexOf(kartupemainModified[r])
                                                if(abc == -1){
                                                    tempArr3.push(kartupemainModified[r])
                                                }
                                            }


                                            tempArrWrap.push(tempArr1)
                                            tempArrWrap.push(tempArr2)
                                            tempArrWrap.push(tempArr3)
                                            cardComb.push(tempArrWrap)

                                            tempArrWrap = []
                                            tempArr2 = []
                                            tempArr3 = []
                                            
                                        }
                                    }
                                }
                            }
                        }
                        
                        tempArr1 = []
                        
                        
                        



                    }
                }
            }
        }
    }
    console.log(cardComb)
}

var coba = ["♠","♥","♣","♦"]
var coba1 = ["0♠","A♥","9♣","Q♦","7♦"]
var coba2 = ["0♠","A♠","9♠","Q♠","7♠"]
var coba3 = ["0♣","8♠","9♦","Q♣","J♠"]
var coba4 = ["0♠","8♠","9♠","Q♠","J♠"]
var coba5 = ["0♠","K♠","A♠","Q♠","J♠"]
var coba6 = ["3♣","2♠","5♦","4♣","A♠"]
var coba7 = ["3♣","2♣","5♣","4♣","A♣"]
var coba8 = ["2♠","2♥","Q♣","Q♦","Q♦"]
var coba9 = ["Q♠","Q♥","Q♣"]


var cardCombValue = []
function findValue(){
    var arrLevel = {
        royalFlush : 100,
        straightFlush : 90,
        fourOfAKind : 80,
        fullHouse : 70,
        flush : 60,
        straight : 50,
        threeOfAKind : 40,
        twoPair : 30,
        onePair : 20,
        highCard : 10,
    }

    var cardValue = {
        2 : 2,
        3 : 3,
        4 : 4,
        5 : 5,
        6 : 6,
        7 : 7,
        8 : 8,
        9 : 9,
        0 : 10,
        J : 11,
        Q : 12,
        K : 13,
        A : 14,
    }

    // 1. Cari apakah nilai kartu Royal Flush; Straight Flush; Flush; Straight; jika tidak
    // 2. Cari apakah nilai kartu Four of a Kind; Full House; Three of a Kind; Two Pair; One Pair; High Card


    // 1
    var value = 0
    function cariStraightFlush(x){
        value = 0
        var valueCounter = []

        // 1.1 Cari Straight
        var straightChecker = []
        for(var i = 0; i < 5; i++){
            straightChecker.push(cardValue[x[i][0]])
        }

        straightChecker.sort(function(a,b){
            return a-b
        })
        
        var straightCounter = 0
        for(var i = 0; i < 4; i++){
            if(straightChecker[i+1]-straightChecker[i]==1){
                straightCounter++
            }
        }
        
        if(straightCounter == 4){
            valueCounter.push("straight")
            valueCounter.push(straightChecker[0])
        } else if ( straightChecker[0] == 2 && straightChecker[1] == 3 && straightChecker[2] == 4 &&
                    straightChecker[3] == 5 && straightChecker[4] == 14){
            valueCounter.push("straight")
            valueCounter.push(1)
        }        
        
        
        // 1.2 Cari Flush    
        arrSuits = {
            "♠" : 4,
            "♥" : 3,
            "♣" : 2,
            "♦" : 1
        }
        var flushCounter = 0
        for(var a = 0; a < 5; a++){
            for(var b = a + 1; b < 5; b++){
                if(x[a][1]==x[b][1]){
                    flushCounter++
                }
            }
        }
        
        if(flushCounter == 10){
            valueCounter.push("flush")
            valueCounter.push(arrSuits[x[0][1]])
        }

        // 1.3 Cari Royal Flush dan Straight Flush
        if(valueCounter.length == 4 && valueCounter[1] == 10){
            value = parseFloat(arrLevel["royalFlush"]) + parseFloat(valueCounter[3])*0.1
        } else if(valueCounter.length == 4){
            value = parseFloat(arrLevel["straightFlush"]) + parseFloat(valueCounter[1])*0.1
        } else if (valueCounter.length == 2){
            value = parseFloat(arrLevel[valueCounter[0]]) + parseFloat(valueCounter[1])*0.1
        } else if (valueCounter.length == 0){
            value = 0
        }
    }

    // 2
    function cariPair(x){
        var pairCheckher = []
        var pairCounter = []
        if(value == 0){
            for(var i = 0; i < 5; i++){
                pairCheckher.push(cardValue[x[i][0]])
            }

            pairCheckher.sort(function(a,b){
                return a-b
            })

            for(var i = 0; i < 5; i++){
                for(var j = i + 1; j < 5; j++){
                    if(pairCheckher[i] == pairCheckher[j]){
                        pairCounter.push(pairCheckher[i])
                    }
                }
            }

            pairCounter.sort(function(a,b){
                return a-b
            })

            if (pairCounter.length == 6){
                value = parseFloat(arrLevel["fourOfAKind"]) + parseFloat(pairCounter[0])*0.1
            } else if (pairCounter.length == 4){
                value = parseFloat(arrLevel["fullHouse"]) + parseFloat(pairCounter[1])*0.1
            } else if (pairCounter.length == 3){
                value = parseFloat(arrLevel["threeOfAKind"]) + parseFloat(pairCounter[0])*0.1
            } else if (pairCounter.length == 2){
                value = parseFloat(arrLevel["twoPair"]) + parseFloat(pairCounter[1])*0.1
            } else if (pairCounter.length == 1){
                value = parseFloat(arrLevel["onePair"]) + parseFloat(pairCounter[0])*0.1
            } else if (pairCounter.length == 0){
                value = parseFloat(arrLevel["highCard"]) + parseFloat(pairCheckher[4])*0.1
            }
        }
    }
    
    var valueAtas = 0
    function cariPairAtas(x){
        valueAtas = 0
        var pairCheckherAtas = []
        var pairCounterAtas = []

        for(var i = 0; i < 3; i++){
            pairCheckherAtas.push(cardValue[x[i][0]])
        }

        pairCheckherAtas.sort(function(a,b){
            return a-b
        })

        for(var i = 0; i < 3; i++){
            for(var j = i + 1; j < 3; j++){
                if(pairCheckherAtas[i] == pairCheckherAtas[j]){
                    pairCounterAtas.push(pairCheckherAtas[i])
                }
            }
        }

        if (pairCounterAtas.length == 3){
            valueAtas = parseFloat(arrLevel["threeOfAKind"]) + parseFloat(pairCounterAtas[0])*0.1
        } else if (pairCounterAtas.length == 1){
            valueAtas = parseFloat(arrLevel["onePair"]) + parseFloat(pairCounterAtas[0])*0.1
        } else if (pairCounterAtas.length == 0){
            valueAtas = parseFloat(arrLevel["highCard"]) + parseFloat(pairCheckherAtas[2])*0.1
        }

    }

    for(var i = 0; i < cardComb.length; i++){
        var tempValue = []
        for(var j = 0; j < cardComb[i].length; j++){
            var card = []

            for(var k = 0; k < cardComb[i][j].length; k++){
                card.push(cardComb[i][j][k].slice(-16,-14))
            }

            if(card.length == 5){
                cariStraightFlush(card)
                cariPair(card)
                tempValue.push(value)
            } else if (card.length == 3){
                cariPairAtas(card)
                tempValue.push(valueAtas)
            }
        }

        if(tempValue[0] > tempValue[1] && tempValue[1] > tempValue[2]){
            cardCombValue.push(tempValue[0] + tempValue[1] + tempValue[2])
        } else {
            cardCombValue.push(0)
        }
    }
}


function findHighestValue(){
    var cardCombValueCopy = []

    for(var i = 0; i < cardCombValue.length; i++){
        cardCombValueCopy.push(cardCombValue[i])
    }

    cardCombValueCopy.sort(function(a,b){
        return b-a
    })

    return cardCombValueCopy[0]
}


// Masukkan seluruh fungsi dalam tombol submit dan Membuat DOM Hasil Kartu Terbaik

var textTitle = document.querySelectorAll(".text-title")[0]
var containerHasil = document.querySelectorAll(".container-hasil")[0]
var kartuHasil = document.getElementsByClassName("kartu-hasil")

function allFunc(){
    submit()
    if(kartupemain.length != 13){
        return false
    }
    findAllCombination()
    findValue()

    var highestValue = findHighestValue()
    var bestCombination = cardComb[cardCombValue.indexOf(highestValue)]

    container.style.visibility = "hidden"
    submitBtn.style.visibility = "hidden"
    textTitle.style.visibility = "hidden"
    containerHasil.style.visibility = "visible"

    console.log(bestCombination)

    var bestCombination = bestCombination[0].concat(bestCombination[1], bestCombination[2])
    console.log(bestCombination)
    for(var i = 0; i < 13; i++){
        kartuHasil[12 - i].innerHTML = bestCombination[i]

        if(bestCombination[i][bestCombination[i].length-8] == "♠" || bestCombination[i][bestCombination[i].length-8] == "♣"){
            kartuHasil[12 - i].style.color = "black"
        } else {
            kartuHasil[12 - i].style.color = "red"
        }
    }

}

submitBtn.onclick = allFunc