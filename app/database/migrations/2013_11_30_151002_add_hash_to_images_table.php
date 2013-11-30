<?php

use Illuminate\Database\Migrations\Migration;

class AddHashToImagesTable extends Migration {

	public function up()
	{
		Schema::table('images', function($table) {
			$table->string('hash', 6)
				->unique()
				->nullable()
				->after('id');
		});
	}

	public function down()
	{
		Schema::table('images', function($table) {
			$table->dropColumn('hash');
		});
	}

}