FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app
COPY . /app

RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y build-essential nodejs

RUN dotnet restore IMS-UI.sln --source https://api.nuget.org/v3/index.json  && \
    dotnet build IMS-UI.sln -c Release && \
    dotnet publish IMS-UI/IMS-UI.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 as runtime
WORKDIR /app
COPY --from=build /app/publish ./
COPY --from=build /app/IMS-UI/Resources ./Resources
ENV ASPNETCORE_ENVIRONMENT=PRODUCTION
CMD dotnet IMS-UI.dll