<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        {!! Html::style('css/app.css') !!}
    </head>
    <body>
        <div id="app">
        </div>

        <script>
            window.Laravel = {
                csrfToken: '{{ csrf_token() }}',
                routes: {
                    notes: '{{ route('api.notes.load') }}'
                }
            };
        </script>
        {!! Html::script('js/app.js') !!}
    </body>
</html>
