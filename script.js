window.onload = function seeBlocks() {

    let count = 10;
    
    let find_line = document.querySelector('.workspace');

    find_line.style.width = 62*count;

    ///////////////////ИЗМЕНЕНО ///////////////////
    for (let i=0; i<count*count;i++) {
        let el = document.createElement('div');
        el.className = "block";
        find_line.appendChild(el);
        el.addEventListener("mouseover", function(){light(event)}, false);
        el.addEventListener("mouseout", function(){lightoff(event)}, false);
        el.addEventListener("contextmenu", function(){flag(event)}, true);
    }


    find_line.addEventListener("click",startStep, false);
     ///////////////////КОНЕЦ ИЗМЕНЕНИЙ ///////////////////
}

    ///////////////////ИЗМЕНЕНО ///////////////////
function startStep() {
    let find_line = document.querySelector('.workspace');

    let myStartEvent = new CustomEvent("mine.start", {
        details: {
            name: "OH MY GOD"
        },
        bubbles: true,
        cancelable: false
    });

    console.log('its mine.start!');
    find_line.addEventListener('mine.start', otzyv, false);
    find_line.dispatchEvent(myStartEvent);
}
///////////////////КОНЕЦ ИЗМЕНЕНИЙ ///////////////////

function flag(event) {
event.preventDefault();
event.currentTarget.className = "flag";
event.currentTarget.transition ="300ms";
  ///////////////////ИЗМЕНЕНО ///////////////////
event.currentTarget.addEventListener("click", function(event){
    event.currentTarget.classList.remove("flag");
    if (event.currentTarget.firstChild.textContent != "-1") {
    event.currentTarget.classList.add("block");
    }
},false);
///////////////////КОНЕЦ ИЗМЕНЕНИЙ ///////////////////
}

function otzyv() {
    let blocks = document.querySelectorAll('.block');

    let count = document.querySelector('input[name="sizew"]').value;
    count = count * document.querySelector('input[name="sizeh"]').value;

    let all_mins = Math.floor(count/6);
    let mins = generate_mins(all_mins, count);
    let i = 1;
    let k = 0;

    for (let block of blocks) {
        let text_block = document.createElement('label');
        text_block.textContent = "0";
        text_block.className = "ghosttext";
        block.appendChild(text_block);
        let n = parseInt(mins[k], 10);

         if (i!=n) {
           block.addEventListener("click",addStep, false);
        } else {
            block.addEventListener("click",endStep, false);
         k++;
        }
        i++;
}
    /////////////////////// ИЗМЕНЕНО ///////////////////////
    removeFirstStep();
     /////////////////// КОНЕЦ ИЗМЕНЕНИЙ ///////////////////
    add_numbers(mins, k);
}

    /////////////////////// ИЗМЕНЕНО ///////////////////////
function endStep() {
    let myEndEvent = new CustomEvent("mine.end", {
        detail: {
            result: "LOSE"
        },
        bubbles: true,
        cancelable: false
    });

    console.log('result' + myEndEvent.detail.result);
    event.currentTarget.addEventListener('mine.end', bum, false);
    event.currentTarget.addEventListener('mine.end', bumbum, false);
    event.currentTarget.dispatchEvent(myEndEvent);
}

function addStep() {
    let koor;

    let blocks = document.querySelector('.workspace');
    blocks = blocks.childNodes;

    for (let i=1; i< blocks.length; i++) {
        if (event.currentTarget == blocks[i]) koor = i;
    }

    let myStepEvent = new CustomEvent("mine.step", {
        detail: {
            koordinate: koor
        },
        bubbles: true,
        cancelable: false
    });

    console.log('koordinate' + myStepEvent.detail.koordinate);
    event.currentTarget.addEventListener('mine.step', openblocks, false);
    event.currentTarget.dispatchEvent(myStepEvent);
}

function removeFirstStep() {
    let find_line = document.querySelector('.workspace');
    find_line.removeEventListener("click", startStep, false);
    find_line.removeEventListener('mine.start',otzyv, false);
}
     /////////////////// КОНЕЦ ИЗМЕНЕНИЙ ///////////////////

function bumbum() {
    let blocks = document.querySelector('.workspace');
    blocks = blocks.childNodes;

    /////////////////////// ИЗМЕНЕНО ///////////////////////
    let mins = [];
    for (let i=1;i<blocks.length ;i++) {
        if (blocks[i].firstChild.textContent=="-1") {
            mins.push(i);
        }
    }
     /////////////////// КОНЕЦ ИЗМЕНЕНИЙ ///////////////////

    for (let i=0; i< mins.length; i++) {
        blocks[mins[i]].className = "blockbomb"; 
        blocks[mins[i]].classList.add('move');
    }

    let find_line = document.querySelector('.workspace');
    let lose = document.createElement('div');
    lose.textContent = "GAME OVER";

    lose.className='youlose';
    find_line.after(lose);

    let w_work = document.querySelector('input[name="sizew"]').value;
    let w_hei = document.querySelector('input[name="sizeh"]').value;

    let new_h = w_hei*62;
    let new_f = w_work*w_hei;
    w_work *= 62;

    lose.style.width = w_work;
    lose.style.height = new_h;
    lose.style.fontSize = new_f;

    let losebutt = document.createElement('button');
    lose.appendChild(losebutt);
    losebutt.className = 'losebutt';
    losebutt.textContent ='AGAIN';
    losebutt.addEventListener('click', function() {location.reload()}, false);
}

function generate_mins(all_mins, count) {
    let k = 0;
    let mins = [];

    while (mins.length!=all_mins) {
        let min = Math.random() * (count - 0) + 1;
        min = Math.floor(min);
        mins.push(min);
        if (mins.length>2){
        mins = better(mins);
        }
    } 
//сортировка
    let key = 0;
    let i = 0;
    for (let j=0; j<all_mins; j++) {
        key = mins[j];
        i = j-1;
        while (i>=0 && mins[i] > key) {
            mins[i+1] = mins[i];
            i = i-1;
            mins[i+1] = key;
        }
    }
   return mins;
}

function add_numbers(mins, k) {
    let blocks = document.querySelector('.workspace');
     let w_work = document.querySelector('input[name="sizew"]').value;
     w_work = parseInt(w_work, 10);
     blocks = blocks.childNodes;
     let sr = w_work -2;

        for (let i=0; i< k; i++) {
           //blocks[mins[i]].style.background = "pink";
            let m = parseInt(mins[i], 10);
            let okr = [m - w_work-1, m-w_work, m+1-w_work, m-1, m+1, m-1+w_work, m+w_work, m+1+w_work];
                for (let j =0 ; j<8; j++) {
                    if (okr[j]>0) {
                        if (!blocks[okr[j]]) {
                            } else {
                                let ost_b = m % w_work;
                                let ost_okr = okr[j] % w_work;
                                if ( (ost_b > sr || ost_b == 0 )  && (ost_okr < 3 && ost_okr!=0 )||( (ost_b < 3 && ost_b != 0) && ( ost_okr > sr || ost_okr == 0))) {
                                } else {
                                    let text = blocks[okr[j]].firstChild;
                                    let text_t = text.textContent;
                                    let num = text_t;
                                    num++;
                                    text.textContent = num;
                                }
                            }
                        } else {
                        }
            }
        }

        for (let i=0; i< k; i++) {
            blocks[mins[i]].firstChild.textContent = '-1';
        }
}


function openblocks(event) {
    let nod = event.currentTarget;
    nod.style.backgroundColor = "blue";

    let blocks = document.querySelector('.workspace');
    blocks = blocks.childNodes;
    let i=0;
    while (blocks[i]!=nod) {
        i++;
    }

    let uuu = blocks[i].firstChild;
    let text = uuu.textContent;
    let k = 1;
    let no =[];
    no[0] = 0;
    if (text=="-1") alert('no');
        if (text == "0") {
            showBlocks( i, k, no);
        } else {
            uuu.style.visibility = "visible";
      
}

let cout=0;

let blocksi = document.querySelectorAll('.block');
for (block of blocksi) { 
uuu = block.firstChild;
    if (((block.firstChild.textContent!="-1")&&((block.firstChild.textContent!="0")))&&(window.getComputedStyle(uuu,null).getPropertyValue("visibility")=="hidden")) {
        cout += 1;
    }
}

if (cout==1) {
        /////////////////////// ИЗМЕНЕНО ///////////////////////
    document.addEventListener("click", winStep, false);
        /////////////////////// КОНЕЦ ИЗМЕНЕНИЙ ///////////////////////
    let m = document.querySelector('.size_pol');
    m.style.visibility = "hidden";
}
}

    /////////////////////// ИЗМЕНЕНО ///////////////////////
function winStep() {
    let myEndEvent = new CustomEvent("mine.win", {
        detail: {
            result: "WIN"
        },
        bubbles: true,
        cancelable: false
    });

    console.log('result' + myEndEvent.detail.result);
    document.addEventListener('mine.win', winwin, false);
    event.currentTarget.dispatchEvent(myEndEvent);
}
    /////////////////////// КОНЕЦ ИЗМЕНЕНИЙ ///////////////////////

function winwin() {
    let find_line = document.querySelector('.workspace');

    let deleteblocks = document.querySelectorAll('label');
    for ( block of deleteblocks) {
    block.style.visibility = "hidden";
    }
    let conf = document.createElement('div');
    conf.className = "bl";
    find_line.parentNode.before(conf);

    let lose = document.createElement('div');
    lose.textContent = "YOU WIN";

    lose.className='youwin';
    conf.appendChild(lose);

    let w_work = document.querySelector('input[name="sizew"]').value;
    let w_hei = document.querySelector('input[name="sizeh"]').value;

    let new_h = w_hei*62;
    let new_f = w_work*w_hei;
    w_work *= 62;

    lose.style.width = w_work;
    lose.style.height = new_h;
    lose.style.fontSize = new_f+40;

    let losebutt = document.createElement('button');
    lose.appendChild(losebutt);
    losebutt.className = 'losebutt';
    losebutt.textContent ='AGAIN';
    losebutt.addEventListener('click', function() {location.reload()}, false);
}


function showBlocks( i, k, no) {
    

    let blocks = document.querySelector('.workspace');
    blocks = blocks.childNodes;
    let w_work = document.querySelector('input[name="sizew"]').value;
    w_work = parseInt(w_work, 10);

    let l = 0;

   let names = [i-w_work*k , i+w_work*k, i-k, i+k];
   let namess =[];
   if ((names[0]<0)||(names[0]> 100)) {
       return 1;
   }

    let len = no.length;
    let pruvv = [0, 0];
    let nam_all=[];
    let num_all = [0, 0, 0, 0, 0, 0, 0, 0];

    k=parseInt(k, 10);
    for (let count =0; count < 2; count ++) {
        for(let kk=-(k); kk<k+1; kk++) {
            name = names[count] +kk;
            name = parseInt(name, 10);

        if (blocks[name]) {
            if(deleteNo(no, name, i, k)==2) {
                namess.push(name);

                let pruv = exception(name);

                if (pruv== -1) {
                    let nam;
                    switch (count) {
                        case 0: 
                            if ( kk == -k ) {
                                nam = Summ(name , -w_work, -1);
                                if  (deleteNo(no, nam, i, k) == 2) {
                                    no.push(nam);
                                    num_all[0]++;
                                    num_all[4] = nam;
                                }
                            }

                            if ( kk == k ) {
                                nam = Summ(name , -w_work, 1);
                                if  (deleteNo(no, nam, i, k) == 2) {
                                    no.push(nam);
                                    num_all[0]++;
                                    num_all[6]=nam;
                                }
                            }

                            nam = Summ(name, -w_work, 0);
                            nam_all.push(nam);
                           

                            if (deleteNo(no,nam,i, k)==2) {
                                no.push(nam);
                                num_all[0]++;
                            }
                            
                            break;

                        case 1:
                                if ( kk == -k ) {
                                    nam = Summ(name , w_work, -1);
                                    if  (deleteNo(no, nam, i, k) == 2) {
                                        no.push(nam);
                                        num_all[1]++;
                                        num_all[5]=nam;
                                    }
                                }

                                if ( kk == k ) {
                                    nam = Summ(name , w_work, 1);
                                    if  (deleteNo(no, nam, i, k) == 2) {
                                        no.push(nam);
                                        num_all[1]++;
                                        num_all[7]=nam;
                                    }
                                }

                                nam = Summ(name , w_work, 0);
                                nam_all.push(nam);
                                if (deleteNo(no,nam,i, k)==2) {
                                    no.push(nam);
                                    num_all[1]++;
                                }

                                break;
                    }
                } else {
                    pruvv[0]++;
                }
                no = better(no);
            }
        }
    }
}

    for (let count =2; count <4; count ++) {
        for (let kk=-(k); kk< k+1; kk++) {
            name = names[count] +w_work*kk;
            name = parseInt(name, 10);

            if(blocks[name]) {
                if(deleteNo(no, name, i, k)==2) {
                    namess.push(name);

                    let pruv = exception(name);
                    if(pruv == -1) {
                        let nam;
                        switch (count) {
                            case 2:
                                nam = Summ(name , 0, -1);
                                nam_all.push(nam);
                            if (deleteNo(no,nam,i,k)==2) {
                                no.push(nam);
                                num_all[2]++;
                           }
                           break;
                            case 3:
                            nam = Summ(name , 0, 1);
                            nam_all.push(nam);
                               if (deleteNo(no,nam,i, k)==2) {
                                   no.push(nam);
                                   num_all[3]++;
                              }
                            }
                } else {
                    pruvv[0]++;
                }
                no = better(no);
            } 
        }
    }

}

    namess = better(namess);
    no = better(no);

    if ((len == no.length )&&(pruvv[0]==0)||(pruvv[0]==0)||((pruvv[0]==1)&&((pruvv[1]%w_work==0)||(pruvv[1]%w_work==1)))) {
    } else {
        k++;
        no = createNo(no, num_all, w_work);
        showBlocks( i, k, no);
    }
}



function createNo(no, num_all, w_work) {
    let l=0;
    let num;
    for ( let l=0; l<num_all[0] ;l++) {
        num = no[l] - w_work;
        no.push(num);
    }

    for (let l=0; l<num_all[1] ;l++) {
        num = no[l] + w_work;
        no.push(num);
    }

    for (let l=0; l<num_all[2] ;l++) {
        num = no[l]-1;
        no.push(num);
    }

    for (let l=0; l<num_all[3] ;l++) {
        num = no[l]+1;
        no.push(num);
    }

    for (let ll=4; ll< 6; ll++) {
        if(num_all[ll]!=0) {
        num = num_all[ll] - 1;
        no.push(num);
        }
    }

    for (let ll=6; ll< 8; ll++) {
        if (num_all[ll]!=0) {
            num = num_all[ll] + 1;
            no.push(num);
        }
     }

return no;

}

function Summ (name , w_work, n) {
    name = parseInt(name, 10);
    w_work = parseInt(w_work, 10);
    n = parseInt(n ,10);
    let k = name+w_work+n;
    return k;
}

function better(arr) {
        let result = [];
      
        for (let str of arr) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }
      
        return result;
      }


function deleteNo (no, name, i, k) {
    let count = document.querySelector('input[name="sizew"]').value;
    let sr = count -2;
    let ost = i%count;
    let ost_okr = name%count;
    count = count * document.querySelector('input[name="sizeh"]').value;

    if ( (ost > sr || ost == 0 )  && (ost_okr < 3 && ost_okr!=0 )||( (ost < 3 && ost != 0) && ( ost_okr > sr || ost_okr == 0))) {
        return -1;
    }

    for (let l=0;no[l] != no.lenght;l++) {
        if ((name == no[l])||(name>count)||(name<1)) {
            return -1;
        }
    }
    return 2;
}

function exception(nod) {
    nod = parseInt(nod, 10);
    let blocks = document.querySelector('.workspace');
    blocks = blocks.childNodes;

    let uuu = blocks[nod].firstChild;
    let text = uuu.textContent;

    if (text == '0') {
        return 2;
    } else {
        if (text!="-1") {
            uuu.style.visibility = "visible";
            return -1;
        }
    } 
}


function bum(event) {
event.currentTarget.className = "blockbomb";
}

function createSize() {
    let countw = document.querySelector('input[name="sizew"]').value;
    let counth = document.querySelector('input[name="sizeh"]').value;
    
    let find_line = document.querySelector('.workspace');
        while (find_line.firstChild) {
            find_line.removeChild(find_line.firstChild);
        }

    find_line.style.width = 62*countw;

    for (let i=0; i<countw*counth;i++) {
        let el = document.createElement('div');
        el.className = "block";
        find_line.appendChild(el);
        el.addEventListener("mouseover", function(){light(event)}, false);
        el.addEventListener("mouseout", function(){lightoff(event)}, false);
        el.addEventListener("click", otzyv, false);
        el.addEventListener("contextmenu", function(){flag(event)}, false);
    }
}

function light(event) {
    event.target.style.mozBoxShadow = '0 0 16px #fff';
    event.target.style.webkitBoxShadow = '0 0 16px #fff';
    event.target.style.boxShadow = '0 0 16px #fff';
} 

function lightoff(event) {
    event.target.style.backgroundColor = '';
    event.target.style.mozBoxShadow = '';
    event.target.style.webkitBoxShadow = '';
    event.target.style.boxShadow = '';
} 

document.onkeydown = handle;
function handle(e) {
    
let blocks = document.querySelector('.workspace');
blocks = blocks.childNodes;

let w_work = document.querySelector('input[name="sizew"]').value;
w_work = parseInt(w_work, 10);
let w_hei = document.querySelector('input[name="sizew"]').value;
w_hei = parseInt(w_hei, 10)*w_work;


    let i = document.querySelector('.ghost');
    i = i.textContent;
    i = parseInt(i, 10);
if (blocks[i]!=undefined){
    lightkoff(blocks[i]); 
     let all_mins = [0];

    switch(e.code) {
        case 'ArrowLeft':
            i--;
            break;
        case 'ArrowUp': 
            i -= w_work;
            break;
        case 'ArrowRight':
            i++;
            break;
        case 'ArrowDown': 
            i += w_work;
            break;
        case 'ControlLeft': 
            blocks[i].className = "flag";
            break;
    }

    if((blocks[i]==undefined)||(i<1)) {
        i=1;
    } else {

    blocks[i].style.mozBoxShadow = '0 0 16px rgb(0%, 44%, 45%, 0.5)';
    blocks[i].style.webkitBoxShadow = '0 0 16px rgb(0%, 44%, 45%, 0.5)'
    blocks[i].style.boxShadow = '0 0 16px rgb(0%, 44%, 45%, 0.5)'

    let texxt = document.querySelector('.ghost');
    texxt.textContent = i;
    }
    }
}



function  lightkoff(block) {
    block.style.backgroundColor = '';
    block.style.mozBoxShadow = '';
    block.style.webkitBoxShadow = '';
    block.style.boxShadow = '';
} 
