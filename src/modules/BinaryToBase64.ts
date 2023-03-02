const {Buffer} = require('buffer');

const BinaryToBase64 = (binartData:any) => {
    return binartData = Buffer.from(
        binartData,
        'binary',
      ).toString('base64');
}

export default BinaryToBase64