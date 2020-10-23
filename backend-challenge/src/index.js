const { ApiPromise, WsProvider } = require('@polkadot/api');

const getBlock = async (height) =>{
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    block = null;
    if(height){
        const hash = await api.rpc.chain.getBlockHash(height)
        block = await api.rpc.chain.getBlock(hash)
    } else {
      block = await api.rpc.chain.getBlock();
    }
      console.log(`The block is: ${block.block}`)	
	process.exit(0)
}

const main = () => {
  var stdin = process.stdin;

  stdin.setRawMode( true );

  stdin.resume();

  stdin.setEncoding( 'utf8' );
  running = true;

  stdin.on( 'data', function( key ){

      if ( key === '\u0003' ) {
        running = false;
        process.exit();
      }
      if (key ===  '\r'){
        try{
          getBlock(key);
        }catch(e){
          console.log(" Wrong block height provided.")
        }
      }
 
      process.stdout.write( key );
  });
}

main()
