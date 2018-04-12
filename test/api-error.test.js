const apiError = require('../lib/api-error-handler.js');


describe('Handle image being too large', () => {
  it('Should return error: The size of uploaded image does not meet the size requirements.', () => {
    let result = {
      error_message: 'IMAGE_FILE_TOO_LARGE'
    }
    expect(apiError(result).msg).toBe('The image file is too large. This API requires image file size to be no larger than 2 MB.');
  });
});

describe('Handle image unsuported format', () => {
  it('Should return error: IMAGE_ERROR_UNSUPPORTED_FORMAT', () => {
    let result = {
      error_message: 'IMAGE_ERROR_UNSUPPORTED_FORMAT'
    }
    expect(apiError(result).msg).toBe('The uploaded image can not be resolved. The file format may not be supported or the file is damaged.');
  });
});

describe('Handle image size does not meet the requirement', () => {
  it('Should return error: INVALID_IMAGE_SIZE', () => {
    let result = {
      error_message: 'INVALID_IMAGE_SIZE'
    }
    expect(apiError(result).msg).toBe('The size of uploaded image does not meet the size requirements.');
  });
});

describe('Handle invalid image URL', () => {
  it('Should return error: INVALID_IMAGE_URL', () => {
    let result = {
      error_message: 'INVALID_IMAGE_URL'
    }
    expect(apiError(result).msg).toBe('Failed downloading image from URL. The image URL is wrong or invalid.');
  });
});

describe('Handle image download timing out', () => {
  it('Should return error:IMAGE_DOWNLOAD_TIMEOUT', () => {
    let result = {
      error_message: 'IMAGE_DOWNLOAD_TIMEOUT'
    }
    expect(apiError(result).msg).toBe('IMAGE_DOWNLOAD_TIMEOUT');
  });
});

describe('Handle insufficient permission to use API', () => {
  it('Should return error: INSUFFICIENT_PERMISSION', () => {
    let result = {
      error_message: 'INSUFFICIENT_PERMISSION'
    }
    expect(apiError(result).msg).toBe('With a Free API Key, you cannot use this. Please do not use this parameter, or use with a Standard API Key.');
  });
});



