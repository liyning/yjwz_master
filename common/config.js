let url_config = ""

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// url_config = 'http://dms1.shanghai.cosmoplat.com/dms'
	// url_config = 'http://10.189.20.154:8080/hmzy'
	// url_config = 'http://10.138.130.1:32899/dms'
	url_config = 'https://smpp.cosmoplat.com/hmzy'
	// url_config = 'https://yywz.cosmoplat.com/dms/'
} else {
	// 生产环境
	url_config = 'https://smpp.cosmoplat.com/hmzy'
	// url_config = 'https://yywz.cosmoplat.com/dms/'
}

export default url_config
