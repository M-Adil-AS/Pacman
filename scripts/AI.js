function ghost_AI(ghost,stop){
    if(ghost.props.mode=='chase'){
        let targets = []
        targets.push({x:center(pacman,'pacman','X'), y:center(pacman,'pacman','Y')})

        let directions = ['up', 'down', 'left', 'right']
        let values = [{x:0, y:-64}, {x:0, y:+64}, {x:-64, y:0}, {x:+64,y:0}]
        let index = directions.indexOf(pacman.props.direction)
        targets.push({x:center(pacman,'pacman','X')+values[index].x, y:center(pacman,'pacman','Y')+values[index].y})

        values = [{x:0, y:-32}, {x:0, y:+32}, {x:-32, y:0}, {x:+32,y:0}]
        let diff_X = center(blinky,'ghost','X') - (center(pacman,'pacman','X')+values[index].x)
        let diff_Y = center(blinky,'ghost','Y') - (center(pacman,'pacman','Y')+values[index].y)
        let Tx = (center(pacman,'pacman','X')+values[index].x) - diff_X
        let Ty = (center(pacman,'pacman','Y')+values[index].y) - diff_Y
        targets.push({x:Tx, y:Ty})

        if(Math.sqrt(Math.pow(center(clyde,'ghost','X')-center(pacman,'pacman','X'),2)+Math.pow(center(clyde,'ghost','Y')-center(pacman,'pacman','Y'),2)) >= 128){
            targets.push({x:center(pacman,'pacman','X'), y:center(pacman,'pacman','Y')})
        }
        else{
            targets.push({x:64, y:475})
        }

        logic(targets,stop,ghost)
    }
    else if(ghost.props.mode=='scatter'){    
        let targets = [{x:464, y:27},{x:64, y:27},{x:464, y:475},{x:64, y:475}]

        if(document.querySelectorAll('.dot').length<=20){
            targets[0] = {x:center(pacman,'pacman','X'), y:center(pacman,'pacman','Y')}
        }

        logic(targets,stop,ghost)     
    }
    else if(ghost.props.mode=='frightened'){
        let options = stop.directions.slice()
        options.splice(options.indexOf(reverse(ghost.props.direction)),1)
        ghost.props.direction = options[Math.floor(Math.random() * options.length)]
    }
    else if(ghost.props.mode=='eaten'){
        let targets = [{x:265, y:187},{x:265, y:187},{x:265, y:187},{x:265, y:187}]
        logic(targets,stop,ghost) 
    }
}

function logic(targets,stop,ghost){
    let options = stop.directions.slice()
    options.splice(options.indexOf(reverse(ghost.props.direction)),1)
    let distances = []

    let ghostNames = ['blinky','pinky','inky','clyde']
    let index = ghostNames.indexOf(ghost.props.name)

    options.forEach((option)=>{
        if(option=='left'){
            distances.push(Math.sqrt(Math.pow((center(ghost,'ghost','X')-16)-targets[index].x,2)+Math.pow(center(ghost,'ghost','Y')-targets[index].y,2)))
        }
        else if(option=='right'){
            distances.push(Math.sqrt(Math.pow((center(ghost,'ghost','X')+16)-targets[index].x,2)+Math.pow(center(ghost,'ghost','Y')-targets[index].y,2)))
        }
        else if(option=='up'){
            distances.push(Math.sqrt(Math.pow(center(ghost,'ghost','X')-targets[index].x,2)+Math.pow((center(ghost,'ghost','Y')-16)-targets[index].y,2)))
        }
        else if(option=='down'){
            distances.push(Math.sqrt(Math.pow(center(ghost,'ghost','X')-targets[index].x,2)+Math.pow((center(ghost,'ghost','Y')+16)-targets[index].y,2)))
        }
    })

    ghost.props.direction = options[distances.indexOf(Math.min(...distances))]
}