function setup(x){
    document.querySelector('#message').innerHTML = 'READY'
    document.querySelector('#message').style.color = 'gold'
    new Audio('sound effects/game_start.wav').play()

    mode_seq = [{mode:'scatter', duration:7000}, {mode:'chase', duration:20000},{mode:'scatter', duration:7000}, {mode:'chase', duration:20000},{mode:'scatter', duration:5000}, {mode:'chase', duration:'-'}]
    house_stay = [0,4000,8000,12000]
    mode_elapsed_time_updated = false

    pacman.style.marginLeft = '253px'
    pacman.style.marginTop = '367px'

    blinky.style.marginLeft = '253px'
    blinky.style.marginTop = '175px'

    pinky.style.marginLeft = '253px'
    pinky.style.marginTop = '223px'

    inky.style.marginLeft = '221px'
    inky.style.marginTop = '223px'

    clyde.style.marginLeft = '285px'
    clyde.style.marginTop = '223px'

    pacman.props = {direction:'left', pointer:'left', name:'pacman'}
    blinky.props = {mode:'scatter', direction:'left', name:'blinky', color:'red', in_house:false, move_out:true}
    pinky.props = {mode:'scatter', direction:'down', name:'pinky', color:'hotpink', in_house:true, move_out:false}
    inky.props = {mode:'scatter', direction:'up', name:'inky', color:'cyan', in_house:true, move_out:false}
    clyde.props = {mode:'scatter', direction:'up', name:'clyde', color:'orange', in_house:true, move_out:false}

    ghosts.forEach((ghost)=>{
        ghost.classList.remove('wear_off')
        ghost.style.background = ghost.props.color
    })

    if(x=='level' || x=='load'){
        arrange_dots()
        arrange_powers()
    }

    document.querySelector('#pointer-box').style.marginLeft = `${center(pacman,'pacman','X') - 21.5}px`
    document.querySelector('#pointer-box').style.marginTop = `${center(pacman,'pacman','Y') - 21.5}px`
    document.querySelector('#pointer-box').style.transform = `rotate(180deg)`
    document.querySelector('#bgMusic').src = 'sound effects/siren_1.wav'

    setTimeout(()=>{      
        document.querySelector('#bgMusic').play()  
        document.querySelector('#message').innerHTML = ''
        start_all([10,10,10,10])
    },4500)
}