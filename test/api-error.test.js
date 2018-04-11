const apiError = require('../lib/api-error-handler.js');



describe('Handle image being too large', () => {
  it('Should return error: The size of uploaded image does not meet the size requirements.',() => {
       let result = {
         error_message : 'IMAGE_FILE_TOO_LARGE'
       }
        expect(apiError(result).msg).toBe('The size of uploaded image does not meet the size requirements.');
        });
  });

  describe('Handle image unsuported format', () => {
    it('Should return error: IMAGE_FILE_TOO_LARGE',() => {
         let result = {
           error_message : 'IMAGE_ERROR_UNSUPPORTED_FORMAT'
         }
          expect(apiError(result).msg).toBe('The size of uploaded image does not meet the size requirements.');
          });
    });


  // if (result.error_message.includes('IMAGE_ERROR_UNSUPPORTED_FORMAT')) {
	// 	console.log("400 - IMAGE_ERROR_UNSUPPORTED_FORMAT");
	// 	return {
	// 		msg: 'The uploaded image can not be resolved. The file format may not be supported or the file is damaged.',
	// 		status: 400
	// 	};
	// }


  



// let apiError = function (result, res) {
// 	if (result.error_message.includes('IMAGE_ERROR_UNSUPPORTED_FORMAT')) {
// 		console.log("400 - IMAGE_ERROR_UNSUPPORTED_FORMAT");
// 		return {
// 			msg: 'The uploaded image can not be resolved. The file format may not be supported or the file is damaged.',
// 			status: 400
// 		};
// 	}

// 	if (result.error_message.includes('INVALID_IMAGE_SIZE')) {
// 		console.log("400 - INVALID_IMAGE_SIZE");
// 		return {
// 			msg: 'The size of uploaded image does not meet the size requirements.',
// 			status: 400
// 		};
// 	}

// 	if (result.error_message.includes('INVALID_IMAGE_URL')) {
// 		console.log('400 - INVALID_IMAGE_URL');
// 		return { 
//       msg : 'Failed downloading image from URL. The image URL is wrong or invalid.',
//       status: 400
//     }
//   }

// 	if (result.error_message.includes('IMAGE_FILE_TOO_LARGE')) {
// 		console.log('400 - IMAGE_FILE_TOO_LARGE');
// 		return {
// 			msg: 'The image file is too large. This API requires image file size to be no larger than 2 MB.',
// 			status: 400
// 		};
// 	}

// 	if (result.error_message.includes('INSUFFICIENT_PERMISSION')) {
// 		res.status(403).send('With a Free API Key, you cannot use this. Please do not use this parameter, or use with a Standard API Key.')
// 		console.log('403 - 	INSUFFICIENT_PERMISSION');
// 	}

// 	if (result.error_message.includes('IMAGE_DOWNLOAD_TIMEOUT')) {
// 		res.status(412).send('With a Free API Key, you cannot use this. Please do not use this parameter, or use with a Standard API Key.')
// 		console.log('412 -IMAGE_DOWNLOAD_TIMEOUT');
// 	}
// };

// module.exports = apiError;