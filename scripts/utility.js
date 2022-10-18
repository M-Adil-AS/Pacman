function center(object,entity,dimension){
    let values = [12,12,2,6]
    let entities = ['ghost','pacman','dot','power']

    for(let i=0; i<entities.length; i++){
        if(entities[i]==entity){
            return dimension=='X' ? Number(object.style.marginLeft.split('px')[0]) + values[i] : Number(object.style.marginTop.split('px')[0]) + values[i]
        }
    }
}

function reverse(direction){
    if(direction=='left'){
        return 'right'
    }
    else if(direction=='right'){
        return 'left'
    }
    else if(direction=='up'){
        return 'down'
    }
    else if(direction=='down'){
        return 'up'
    }
}

function clear_all(){
    clearInterval(pacmanInterval)
    clearInterval(blinkyInterval)
    clearInterval(pinkyInterval)
    clearInterval(inkyInterval)
    clearInterval(clydeInterval)
    clearInterval(houseInterval)
    clearInterval(modeInterval)
    clearTimeout(power_outerTimeout)
    clearTimeout(power_innerTimeout)
}

function start_all(intervals){
    move_pacman()
    move_blinky(intervals[0])
    move_pinky(intervals[1])
    move_inky(intervals[2])
    move_clyde(intervals[3])
    house_timer('start')
    mode_timer('start')
}