function power_timer(x,outerTime,innerTime){
    power_time_stamp = new Date()

    if(x=='start'){
        consecutive_kills = 0
        power_elapsed_time = 0
    }

    power_outerTimeout = setTimeout(()=>{     
        ghosts.forEach((ghost)=>{
            if(ghost.props.mode=='frightened'){
                ghost.classList.add('wear_off')
            }
        })  

        power_innerTimeout = setTimeout(()=>{
            ghosts.forEach((ghost,index)=>{
                if(ghost.props.mode=='frightened'){
                    clearInterval(ghostIntervals(index))
                    ghost.classList.remove('wear_off')
                    ghost.props.mode = mode_seq[0].mode
                    ghost.style.background = ghost.props.color
                    move_ghosts[index](10)
                }
            })  

            if(document.querySelector('#bgMusic').getAttribute('src')!='sound effects/retreating.wav'){
                let src = mode_seq[0].mode=='scatter' ? 'siren_1' : 'siren_3'
                document.querySelector('#bgMusic').pause()
                document.querySelector('#bgMusic').src = `sound effects/${src}.wav`
                document.querySelector('#bgMusic').play()
            }

            mode_seq.length!=1 && mode_timer('resume')
        },innerTime)
    },outerTime)
}

function mode_timer(x){
    mode_time_stamp = new Date()
    mode_elapsed_time_updated = false

    if(x=='start'){
        mode_elapsed_time = 0
    }
    
    modeInterval = setInterval(()=>{
        mode_elapsed_time = mode_elapsed_time + (new Date() - mode_time_stamp)
        mode_time_stamp = new Date()

        if(mode_elapsed_time>=mode_seq[0].duration){
            mode_elapsed_time = 0
            mode_seq.shift()
            ghosts.forEach((ghost)=>{
                if(ghost.props.mode!='eaten'){
                    if(!ghost.props.in_house){
                        ghost.props.direction = reverse(ghost.props.direction)
                    }
                    ghost.props.mode = mode_seq[0].mode
                }
            })

            if(document.querySelector('#bgMusic').getAttribute('src')!='sound effects/retreating.wav'){
                let src = mode_seq[0].mode=='scatter' ? 'siren_1' : 'siren_3'
                document.querySelector('#bgMusic').pause()
                document.querySelector('#bgMusic').src = `sound effects/${src}.wav`
                document.querySelector('#bgMusic').play()
            }

            mode_seq.length==1 && clearInterval(modeInterval)
        }
    },100)
}

function house_timer(x){
    house_time_stamp = new Date()

    if(x=='start'){
        house_elapsed_time = 0
    }

    houseInterval = setInterval(()=>{
        house_elapsed_time = house_elapsed_time + (new Date() - house_time_stamp)
        house_time_stamp = new Date()

        for(let i=0; i<4; i++){
            if(house_elapsed_time>=house_stay[i]){
                ghosts[i].props.move_out = true
            }
        }
    },100)
}