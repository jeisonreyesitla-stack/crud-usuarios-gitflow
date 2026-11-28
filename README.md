# Crud Usuarios - Proyecto Git Flow

Este es mi proyecto de la tarea donde hice un crud de usuarios aplicando la metodologia Git Flow.

## Que hice

Arme un crud simple con Node.js y Express para manejar usuarios. Use un archivo json como base de datos para no complicarme con una base de datos real.

Fui agregando funcionalidades por partes, cada una en su propia rama, y las fui integrando poco a poco a traves de pull requests hasta llegar a main.

## Ramas que cree

- feature/login-form: agregue una pagina de login simple
- feature/validate-user-input: agregue validacion a los datos que se mandan al crear o editar un usuario
- feature/payment-api-integration: agregue un campo de membresia y un endpoint que simula un pago
- feature/user-dashboard: agregue una pagina de dashboard con estadisticas de los usuarios
- hotfix/fix-date-format: corregi el formato de la fecha de registro del usuario

## Flujo que segui

Cada rama la saque de develop, hice los cambios, y despues abri un pull request hacia develop, otro hacia qa y otro hacia main, cerrando cada uno con el merge. Asi me asegure que todo terminara integrado en main al final.

