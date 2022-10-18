function arrange_dots(){
    let start_X = 62
    let start_Y = 25

    matrix.forEach((row,index_R)=>{
        row.forEach((col,index_C)=>{
            if(matrix[index_R][index_C]==1){
                let style = `margin-left:${start_X+(index_C*16)}px; margin-top:${start_Y+(index_R*16)}px`
                document.querySelector('#maze').insertAdjacentHTML('beforeend', `<div class='dot' style='${style}'></div>`)
            }
        })
    })
}

function arrange_powers(){
    let positions = [{x:58, y:53}, {x:458, y:53}, {x:58, y:373}, {x:458, y:373}]

    for(let i=0; i<4; i++){
        let style = `margin-left:${positions[i].x}px; margin-top:${positions[i].y}px`
        document.querySelector('#maze').insertAdjacentHTML('beforeend', `<div class='power' style='${style}'></div>`)
    }
}