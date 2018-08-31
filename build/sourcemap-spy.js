const { getOptions } = require( "loader-utils" );

module.exports = function( content, sourcemap ) {
	let options = getOptions( this );

	if ( sourcemap != null ) {
		let sources = Array.isArray( sourcemap.sources ) ? sourcemap.sources : [];

		console.log( options.title ? `Sourcemap spy - ${options.title}:` : "Sourcemap spy:" );
		sources.forEach( source => console.log( `  ${source}` ));
		console.log( "\n" );
	}

	this.callback( null, content, sourcemap );
};
