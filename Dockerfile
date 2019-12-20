FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app
COPY . /app

RUN dotnet restore IMS-UI.sln --source https://api.nuget.org/v3/index.json

RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y build-essential nodejs

RUN dotnet build IMS-UI.sln -c Release && \
    dotnet publish IMS-UI/IMS-UI.csproj -c Release -o /app/publish

#FROM node:12.13.0 as nodebuilder
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#COPY IMS-UI/ClientApp/package.json /usr/src/app/package.json

#RUN npm install
#RUN npm install -g @angular/cli@8.3.12 
#COPY IMS-UI/ClientApp/. /usr/src/app
#RUN npm run build

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 as runtime
WORKDIR /app
COPY --from=build /app/publish ./
#RUN mkdir -p /app/ClientApp/dist
#COPY --from=nodebuilder /usr/src/app/dist/. /app/ClientApp/dist/
ENV ASPNETCORE_ENVIRONMENT=PRODUCTION
CMD dotnet IMS-UI.dll