function myMove() {
    //gameover
    var elem = document.getElementById("over");
    var pos_y = 600;
    var pos_x = 380;
    var dir = 1;
    //bazzis
    var baz1 = document.getElementById("bazzi1");
    var baz2 = document.getElementById("bazzi2");
    var baz3 = document.getElementById("bazzi3");
    var baz4 = document.getElementById("bazzi4");
    var pos_1 = 800;
    var pos_2 = 700;
    var pos_3 = 850;
    var pos_4 = 650;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos_y == 40 && pos_1 == -147 && pos_2 == -147 && pos_3 == -147 && pos_4 == -147) {
            clearInterval(id);
            btn_out();
        } 
        if(pos_y > 40){
            if(dir == 1){
                pos_x = pos_x + 1;
                if(pos_x == 450) dir = 0;
            }
            else if(dir == 0){
                pos_x = pos_x - 1;
                if(pos_x == 300) dir = 1;
            }
            else {
                pos_x++;
            }
            pos_y--;
            elem.style.top = pos_y + 'px';
            elem.style.left = pos_x + 'px';
        }
        if(pos_1 > -147) {
            pos_1--;
            baz1.style.top = pos_1 + 'px';
        }
        if(pos_2 > -147) {
            pos_2--;
            baz2.style.top = pos_2 + 'px';
        }
        if(pos_3 > -147) {
            pos_3--;
            baz3.style.top = pos_3 + 'px';
        }
        if(pos_4 > -147) {
            pos_4--;
            baz4.style.top = pos_4 + 'px';
        }
    }
}
function btn_out(){
    document.getElementById("exit").style.display = '';
}
function gameexit(){
    window.location.href = "menu.html";
}
window.onload = function (){
    myMove();
}