let move_speed = 3, gravity = 0.5


let bird = document.querySelector('.bird')
let img = document.getElementById('bird-1')

let bird_props = bird.getBoundingClientRect()
let background = document.querySelector('.background').getBoundingClientRect()

let message = document.querySelector('.message')
let score_title = document.querySelector('.score_title')
let score_val = document.querySelector('.score_val')
let high_score = localStorage.getItem('high_score') || 0
let high_score_element = document.querySelector('.high_score_val')
high_score_element.innerHTML = high_score

let game_state = 'Start'
img.style.display = 'none'

document.addEventListener('keydown',function(e){
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe').forEach((e) => {
            e.remove()
        })

        img.style.display = 'block'
        bird.style.top = '40vh'
        game_state = 'Play'
        message.innerHTML = ''
        score_title.innerHTML = 'Score: '
        score_val.innerHTML = '0'
        play()
    }
})
function play(){
    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return
        
        bird_dy = bird_dy + gravity

        document.addEventListener('keydown', function(e){
            if(e.key == 'ArrowUp' || e.key == ''){
                img.src = 'images/Bird-2.png'
                bird_dy = -7.6
            }
        })
        
        document.addEventListener('keyup', function(e){
            if(e.key == 'ArrowUp' || e.key == ''){
                img.src = 'images/Bird.png'
            }
        })

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End'
            message.style.left = '25vh'
            window.location.reload()
            return
        }

        bird.style.top = bird_props.top + bird_dy + 'px'
        bird_props = bird.getBoundingClientRect()
        requestAnimationFrame(apply_gravity)
    }
    requestAnimationFrame(apply_gravity)

    
    function move(){
        if(game_state != 'Play') return

        let pipe_sprite = document.querySelectorAll('.pipe')
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect()
            bird_props = bird.getBoundingClientRect()

            if(pipe_sprite_props.right <= 0 ){
                element.remove()
            }else{
                if(
                    bird_props.left < pipe_sprite_props.left + 
                    pipe_sprite_props.width && bird_props.left + 
                    bird_props.width > pipe_sprite_props.left &&

                    bird_props.top < pipe_sprite_props.top + 
                    pipe_sprite_props.height && bird_props.top + 
                    bird_props.height > pipe_sprite_props.top
                ){
                    game_state = 'End'
                    message.innerHTML = 'GAME OVER UR HIGH SCORE: '+ high_score
                    img.style.display = 'none'
                    return
                }else{
                    if(
                        pipe_sprite_props.right < bird_props.left && 
                        pipe_sprite_props.right + move_speed >= bird_props.left + 
                        element.increase_score == '1'
                    ){
                        score_val.innerHTML =+ score_val.innerHTML + 1
                    }

                    if(parseInt(score_val.innerHTML) > high_score){
                        high_score = parseInt(score_val.innerHTML)
                        high_score_element.innerHTML = high_score

                        localStorage.setItem('high_score',high_score)
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px'
                }
            }
        })
        requestAnimationFrame(move)
    }
    requestAnimationFrame(move)

    let pipe_seperation = 0,
        pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return

        if(pipe_seperation > 115){
            pipe_seperation = 0

            let pipe_propsi = Math.floor(Math.random() * 43) + 8

            let pipe_sprit_atas = document.createElement('div')
            pipe_sprit_atas.className = 'pipe'
            pipe_sprit_atas.style.top = pipe_propsi - 70 + 'vh'
            pipe_sprit_atas.style.left = '100vw'
            document.body.appendChild(pipe_sprit_atas)

            let pipe_sprit_bawah = document.createElement('div')
            pipe_sprit_bawah.className = 'pipe'
            pipe_sprit_bawah.style.top = pipe_propsi + pipe_gap + 'vh'
            pipe_sprit_bawah.style.left = '100vw'
            pipe_sprit_bawah.increase_score = '1'
            document.body.appendChild(pipe_sprit_bawah)
        }
        pipe_seperation++
        requestAnimationFrame(create_pipe)
    }
    requestAnimationFrame(create_pipe)
}