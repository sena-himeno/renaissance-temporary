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
        this.key_total = 223;
            
        this.initTable();
        this.initBlock();

        this.fill_color='red';
    }

    initTable(){
        this.basic_row = 10;
        this.basic_col = 10;

    }

    initBlock(){


        let block_total = Math.floor(this.key_total / 100) + 1;

        this.block_col_total = this.block_row_total = Math.round(Math.sqrt(block_total,2));

        this.current_block_row = 0;
        this.current_block_col = 0;
        
        this.current_row = 0;
        this.current_col = 0;
        
        this.point_row_total = this.basic_row * 10;
        this.point_col_total = this.basic_col * 10;
        
        this.point_size_x = 30;
        this.point_size_y = 30;

        this.current_point_x = 0;
        this.current_point_y = 0;

        this.col_success_count = 0;
        this.col_failure_count = 0;



    }
    nextKeyPosition(){
        


        let var1 = this.key_count % 100;

        let key_col_postion = var1 % 10;
        let key_row_postion = Math.floor(var1 / 10);

        let next_key_position_y = (this.current_block_col * 10 + key_col_postion) * this.point_size_x;
        let next_key_position_x = (this.current_block_row * 10 + key_row_postion) * this.point_size_y

         


        this.key_count ++
        
        this.blockRule();
        
        return {next_key_position_x,next_key_position_y};

    }
    blockRule(){
        if(this.key_count % 100 === 0){
            if(this.current_block_col >= this.block_col_total){
                this.block_col_total ++;
            }else{
                this.block_row_total ++;
                this.block_col_total = 0;
            }
        } 
        if(this.key_count % 10 === 0){
            this.col_failure_count = 0;
            this.col_success_count = 0; 
        }
        

    }

    draw(result){
        
        if(result === 1){
            this.fill_color = 'green';
        }else{
            this.fill_color = 'red';
        }
        this.ctx.fillStyle = this.fill_color;
        const position_info = this.nextKeyPosition() 
        console.log(position_info);
        this.ctx.fillRect(
            position_info.next_key_position_x,position_info.next_key_position_y,
            this.point_size_x,this.point_size_y
        )

        

    }
    test(){
        setInterval(()=>{
            const current_result = Math.floor(Math.random() * 2)
            console.log(this.key_count);
            this.draw(current_result)
        },200)
    }

}

const printView = new PrintResult();
printView.draw();