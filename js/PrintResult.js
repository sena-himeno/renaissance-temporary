class PrintResult{
    constructor(result_canvas,key_info){
        this.result_canvas = result_canvas;
        console.log(this.result_canvas);
        this.key_info = key_info
    
        this.ctx = this.result_canvas.getContext('2d');
        this.init();
    }

    init(){
        // this.ctx = this.result_canvas.getContext("2d");
        this.key_count = 0;
        // this.key_total = this.key_info.length;
        this.key_total = 523;
            
        this.initTable();
        this.initBlock();

    }

    initTable(){
        this.basic_row = 10;
        this.basic_col = 10;

    }

    initBlock(){


        let block_total = Math.floor(this.key_total / 100) + 1;

        this.block_col_total = this.block_row_total = Math.ceil(Math.sqrt(block_total,2));

        this.current_block_row = 0;
        this.current_block_col = 0;
        
        this.current_row = 0;
        this.current_col = 0;
        
        this.point_row_total = this.basic_row * 10;
        this.point_col_total = this.basic_col * 10;
        
        this.point_size_x = 5;
        this.point_size_y = 5;

        this.current_point_x = 0;
        this.current_point_y = 0;

        this.row_success_count = 0;
        this.row_failure_count = 0;


    }

    nextKeyPosition(current_result){
        

        let key_count_in_block = this.key_count % 100;
        
        let next_key_col_in_block = this.pointColRule(key_count_in_block); 
        let next_key_row_in_block = this.pointRowRule(current_result);

        let next_key_position_x = (this.current_block_col * 10 + next_key_col_in_block) * this.point_size_x;
        let next_key_position_y = (this.current_block_row * 10 + next_key_row_in_block) * this.point_size_y;
         


        this.key_count ++
        
        this.blockRule();
        
        return {next_key_position_x,next_key_position_y};

    }
    pointRowRule(current_result){
        let row_position;
        console.log(`current_result : ${current_result} `);
        if(current_result === 1){
            row_position = 9 - this.row_success_count;
            this.fill_color = 'green';
            this.row_success_count ++; 
        }else{
            row_position = this.row_failure_count;
            this.row_failure_count++;
            this.fill_color = 'red';
        }
        return row_position
    }
    pointColRule(key_count_in_block){
        let col_postion;
        col_postion = Math.floor(key_count_in_block / 10);
        return col_postion;
    }
    blockRule(){
        if(this.key_count % 100 === 0){
            console.log(`keycount ${this.key_count}`);
            this.current_block_col ++;
            if(this.current_block_col  <= this.block_col_total -1){

                // this.current_block_col ++;

            }else{
                console.log('row');
                console.log(`${this.current_block_row } / ${this.block_row_total}`);
                this.current_block_row ++;
                this.current_block_col = 0;
            }
            if(this.current_block_row >= this.block_row_total){
                this.ctx = null;
            }
        } 
        if(this.key_count % 10 === 0){
            this.row_failure_count = 0;
            this.row_success_count = 0; 
        }
        
    }

    draw(result){
        
        
        const position_info = this.nextKeyPosition(result) 
        this.ctx.fillStyle = this.fill_color;
        console.log(position_info);
        this.ctx.fillRect(
            position_info.next_key_position_x,position_info.next_key_position_y,
            this.point_size_x,this.point_size_y
        )

        

    }
    test(){
        console.log(this.block_col_total);
        console.log(this.block_row_total);
        setInterval(()=>{
            const current_result = Math.floor(Math.random() * 2)
            console.log(this.key_count);
            this.draw(current_result)
        },50)




        // 
        // setInterval(()=>{
        //     const current_result = 1
        //     console.log(this.key_count);
        //     this.draw(current_result)
        // },1000)



    }

}
