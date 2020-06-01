http://3.9.10.4:3000/swagger/

if you want to start the src code do:
1) npm install
2) npm run build
3) npm start

to run postgres database:
1) install docker
2) docker run --name CustomerAppDB -e POSTGRES_PASSWORD=root -e POSTGRES_USER=root -e POSTGRES_DB=test -p 5432:5432 -d postgres

for the api method "GET /customers?byAgeGreaterThan={minAge}&size={size}&page={page}"
we infered GreaterThan AND NOT GreaterThan or Equals

and we sorted by age for every get method.

Liran Nachman - 311342836
Eden Dupont - 204808596
Aaron Reuven - 204880082