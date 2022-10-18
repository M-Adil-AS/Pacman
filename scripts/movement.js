function step(object){
    if(object.props.direction=='right'){
        object.style.marginLeft = `${Number(object.style.marginLeft.split('px')[0]) + 1}px`
    }
    else if(object.props.direction=='left'){
        object.style.marginLeft = `${Number(object.style.marginLeft.split('px')[0]) - 1}px`
    }
    else if(object.props.direction=='up'){
        object.style.marginTop = `${Number(object.style.marginTop.split('px')[0]) - 1}px`
    }
    else if(object.props.direction=='down'){
        object.style.marginTop = `${Number(object.style.marginTop.split('px')[0]) + 1}px`
    }
    if(object.props.name=='pacman'){
        document.querySelector('#pointer-box').style.marginLeft = `${center(pacman,'pacman','X') - 21.5}px`
        document.querySelector('#pointer-box').style.marginTop = `${center(pacman,'pacman','Y') - 21.5}px`
    }
}

function move_pacman(){
    pacmanInterval = setInterval(()=>{
        let stop = null

        stops.forEach((object)=>{
            if(object.x==center(pacman,'pacman','X') && object.y==center(pacman,'pacman','Y')){
                stop = object
            }           
        })    

        if(stop && stop.directions.includes(pacman.props.pointer)){
            pacman.props.direction = pacman.props.pointer
            step(pacman)
        }
        else if(stop && !stop.directions.includes(pacman.props.pointer) && stop.directions.includes(pacman.props.direction)){
            step(pacman)
        }
        else if(!stop){
            step(pacman)
        }

        document.querySelectorAll('.dot').forEach((dot)=>{
            if(center(dot,'dot','X')==center(pacman,'pacman','X') && center(dot,'dot','Y')==center(pacman,'pacman','Y')){
                dot.remove()
                document.querySelector('#score-value').innerHTML = Number(document.querySelector('#score-value').innerHTML) + 10
                if(document.querySelectorAll('.dot').length%2==0){
                    new Audio('sound effects/munch_1.wav').play()
                }
                else{
                    new Audio('sound effects/munch_2.wav').play()
                }

                if(document.querySelectorAll('.dot').length==0){
                    clear_all()
                    document.querySelector('#bgMusic').pause()
                    new Audio('sound effects/extend.wav').play()
                    setTimeout(()=> setup('level'),2000)
                }
            }
        })

        document.querySelectorAll('.power').forEach((power)=>{
            if(center(power,'power','X')==center(pacman,'pacman','X') && center(power,'power','Y')==center(pacman,'pacman','Y')){
                power.remove()
                clearTimeout(power_outerTimeout)
                clearTimeout(power_innerTimeout)
                clearInterval(modeInterval)

                if(!mode_elapsed_time_updated){
                    mode_elapsed_time = mode_elapsed_time + (new Date() - mode_time_stamp)
                    mode_elapsed_time_updated = true
                }

                document.querySelector('#bgMusic').pause()
                document.querySelector('#bgMusic').src = `sound effects/power_pellet.wav`
                document.querySelector('#bgMusic').play()

                ghosts.forEach((ghost,index)=>{
                    if(ghost.props.mode!='eaten'){
                        clearInterval(ghostIntervals(index))
                        ghost.classList.remove('wear_off')
                        if(!ghost.props.in_house){
                            ghost.props.direction = reverse(ghost.props.direction)
                        }
                        ghost.props.mode = 'frightened'
                        ghost.style.background = 'blue'
                        move_ghosts[index](14)
                    }
                })          

                power_timer('start',6500,3500)
            }
        })

        if(center(pacman,'pacman','X')<=16 && center(pacman,'pacman','Y')==235 && pacman.props.direction=='left'){
            pacman.style.marginLeft = '496px'
        }
        else if(center(pacman,'pacman','X')>=508 && center(pacman,'pacman','Y')==235 && pacman.props.direction=='right'){
            pacman.style.marginLeft = '4px'
        }

        for(let i=0; i<ghosts.length; i++){
            let ghost_A = ghosts[i]
            let index_A = i

            if(ghost_A.props.mode!='eaten' && !ghost_A.props.in_house){
                let distance = Math.sqrt(Math.pow(center(pacman,'pacman','X')-center(ghost_A,'ghost','X'),2)+Math.pow(center(pacman,'pacman','Y')-center(ghost_A,'ghost','Y'),2))
                if(distance<=24){
                    if(ghost_A.props.mode!='frightened'){
                        clear_all()
                        document.querySelector('#bgMusic').pause()
                        new Audio('sound effects/death_1.wav').play()
                        Array.from(document.querySelectorAll('#lives-board img')).slice(-1)[0].remove()
                        if(!Array.from(document.querySelectorAll('#lives-board img')).length){
                            document.querySelector('#message').style.color = 'red'
                            document.querySelector('#message').innerHTML = 'GAME OVER'
                        }
                        else{
                            setTimeout(()=> setup('life'),2500)
                        }      
                        break                      
                    }
                    else{
                        clearInterval(houseInterval)
                        clearInterval(pacmanInterval)
                        clearTimeout(power_outerTimeout)
                        clearTimeout(power_innerTimeout)

                        house_elapsed_time = house_elapsed_time + (new Date() - house_time_stamp)
                        power_elapsed_time = power_elapsed_time + (new Date() - power_time_stamp)

                        ghosts.forEach((ghost_B,index_B)=>{
                            if(ghost_B.props.mode!='eaten'){
                                clearInterval(ghostIntervals(index_B))
                            }
                        })

                        document.querySelector('#bgMusic').pause()      
                        new Audio('sound effects/eat_ghost.wav').play()
                        ghost_A.props.mode = 'eaten'
                        ghost_A.classList.remove('wear_off')
                        ghost_A.style.background = 'white'
                        kill_pause = true
                        consecutive_kills++
                        document.querySelector('#score-value').innerHTML = Number(document.querySelector('#score-value').innerHTML) + (Math.pow(2,consecutive_kills)*100)

                        setTimeout(()=>{
                            move_ghosts[index_A](6)
                            document.querySelector('#bgMusic').src = 'sound effects/retreating.wav'      
                            document.querySelector('#bgMusic').play()    
                            house_timer('resume')
                            move_pacman()
                            kill_pause = false

                            ghosts.forEach((ghost_B,index_B)=>{
                                if(ghost_B.props.mode!='eaten'){
                                    clearInterval(ghostIntervals(index_B))
                                    ghost_B.props.mode=='frightened' ? move_ghosts[index_B](14) : move_ghosts[index_B](10)
                                }
                            })

                            if(power_elapsed_time<=6500){
                                power_timer('resume',6500-power_elapsed_time,3500)
                            }
                            else{
                                power_timer('resume',0,3500-(power_elapsed_time-6500))
                            }
                        },800)
                        break
                    }
                }
            }
        }
    },8)
}

function move_ghost(ghost){
    let stop = null

    stops.forEach((object)=>{
        if(object.x==center(ghost,'ghost','X') && object.y==center(ghost,'ghost','Y')){
            stop = object
        }           
    })    

    if(ghost.props.in_house){
        if(ghost.props.move_out){
            if(center(ghost,'ghost','X')==265 && center(ghost,'ghost','Y')==187){
                ghost.props.direction = 'left'
                ghost.props.in_house = false
            }
            else if(center(ghost,'ghost','X')==265){
                ghost.props.direction = 'up'
            }
            else{
                let ghostNames = ['inky','clyde']
                let directions = ['right','left']
                ghost.props.direction = directions[ghostNames.indexOf(ghost.props.name)]
            }
            step(ghost)
        }
        else{
            if(center(ghost,'ghost','Y')==245 || center(ghost,'ghost','Y')==225){
                ghost.props.direction = reverse(ghost.props.direction)
            }
            step(ghost)
        }
    }
    else{
        if(stop){
            ghost_AI(ghost,stop)
            step(ghost)
        }
        else{
            if(ghost.props.mode=='eaten' && center(ghost,'ghost','X')==265 && center(ghost,'ghost','Y')==187){
                ghost.props.direction = 'down'
            }
            if(ghost.props.mode=='eaten' && center(ghost,'ghost','X')==265 && center(ghost,'ghost','Y')==235){
                if(ghost.props.name=='inky'){
                    ghost.props.direction = 'left'
                }
                else if(ghost.props.name=='clyde'){
                    ghost.props.direction = 'right'
                }
            }

            if(ghost.props.mode=='eaten' && center(ghost,'ghost','Y')==235){
                let case_1 = (ghost.props.name=='blinky' || ghost.props.name=='pinky') && center(ghost,'ghost','X')==265
                let case_2 = ghost.props.name=='inky' && center(ghost,'ghost','X')==233
                let case_3 = ghost.props.name=='clyde' && center(ghost,'ghost','X')==297

                if(case_1 || case_2 || case_3){
                    let ghostNames = ['blinky','pinky','inky','clyde']
                    let directions = ['down','down','up','up']
                    let index = ghostNames.indexOf(ghost.props.name)
                    ghost.style.background = ghost.props.color
                    ghost.props.mode = mode_seq[0].mode
                    ghost.props.in_house = true 
                    ghost.props.move_out = false   
                    ghost.props.direction = directions[index]

                    house_stay[index] = house_elapsed_time + 4000

                    clearInterval(ghostIntervals(index))
                    !kill_pause && move_ghosts[index](10)

                    if(document.querySelector('#bgMusic').getAttribute('src')=='sound effects/retreating.wav'){
                        if(ghosts.filter((ghost)=> ghost.props.mode=='eaten').length==0){
                            let src = mode_seq[0].mode=='scatter' ? 'siren_1' : 'siren_3'
                            document.querySelector('#bgMusic').pause()
                            document.querySelector('#bgMusic').src = `sound effects/${src}.wav`
                            document.querySelector('#bgMusic').play()
                        }
                    }
                }
            }
            step(ghost)
        }
    }

    if(center(ghost,'ghost','X')<=16 && center(ghost,'ghost','Y')==235 && ghost.props.direction=='left'){
        ghost.style.marginLeft = '496px'
    }
    else if(center(ghost,'ghost','X')>=508 && center(ghost,'ghost','Y')==235 && ghost.props.direction=='right'){
        ghost.style.marginLeft = '4px'
    }
}