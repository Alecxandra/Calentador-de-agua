USE [master]
GO
/****** Object:  Database [SimulacionCalentadorDeAgua]    Script Date: 16/02/2016 11:24:09 ******/
CREATE DATABASE [SimulacionCalentadorDeAgua]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SimulacionCalentadorDeAgua', FILENAME = N'c:\Program Files (x86)\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\SimulacionCalentadorDeAgua.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'SimulacionCalentadorDeAgua_log', FILENAME = N'c:\Program Files (x86)\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\SimulacionCalentadorDeAgua_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SimulacionCalentadorDeAgua].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET ARITHABORT OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET  MULTI_USER 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [SimulacionCalentadorDeAgua]
GO
/****** Object:  Table [dbo].[Tanque]    Script Date: 16/02/2016 11:24:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tanque](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[envTemp] [nvarchar](50) NULL,
	[volumenTanque] [nvarchar](50) NULL,
	[volumenAgua] [nvarchar](50) NULL,
	[potenciaCalentador] [nvarchar](50) NULL,
	[flujoEntranteAgua] [nvarchar](50) NULL,
	[flujoSalienteAgua] [nvarchar](50) NULL,
	[actualTemp] [nvarchar](50) NULL,
	[desiredTemp] [nvarchar](50) NULL,
	[time] [nvarchar](50) NULL,
 CONSTRAINT [PK_datosEntrada] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
USE [master]
GO
ALTER DATABASE [SimulacionCalentadorDeAgua] SET  READ_WRITE 
GO
