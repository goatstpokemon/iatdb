@echo off
echo Starting PHP development server...
start cmd /k "php artisan serve"
echo PHP development server started.

echo Starting npm development server...
start cmd /k "npm run dev"
echo npm development server started.
