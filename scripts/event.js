document.addEventListener('keydown',(e)=>{
    if(e.key.includes('Arrow') && pacman.props){
        let values = [{direction:'up', angle:270},{direction:'right', angle:0},{direction:'left', angle:180},{direction:'down', angle:90}]
        pacman.props.pointer = e.key.split('Arrow')[1].toLowerCase()   
        document.querySelector('#pointer-box').style.transform = `rotate(${values.find(object => object.direction==pacman.props.pointer).angle}deg)`
    
        if(pacman.props.direction=='left' && e.key=='ArrowRight'){
            pacman.props.direction = 'right'
        }
        else if(pacman.props.direction=='right' && e.key=='ArrowLeft'){
            pacman.props.direction = 'left'
        }
        else if(pacman.props.direction=='up' && e.key=='ArrowDown'){
            pacman.props.direction = 'down'
        }
        else if(pacman.props.direction=='down' && e.key=='ArrowUp'){
            pacman.props.direction = 'up'
        }
    }
    if(e.key=='Enter' && !pacman.props){
        setup('load')
    }
})