﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(CarIssueContext))]
    partial class CarIssueContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("Backend.Models.Car", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long?>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("Backend.Models.CarIssue", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long?>("CarId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreateDateTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal?>("RepairCost")
                        .HasColumnType("decimal(8, 2)");

                    b.Property<DateTime?>("RepairDateTime")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.ToTable("CarIssues");
                });

            modelBuilder.Entity("Backend.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Backend.Models.Car", b =>
                {
                    b.HasOne("Backend.Models.User", null)
                        .WithMany("Cars")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Backend.Models.CarIssue", b =>
                {
                    b.HasOne("Backend.Models.Car", null)
                        .WithMany("Issues")
                        .HasForeignKey("CarId");
                });

            modelBuilder.Entity("Backend.Models.Car", b =>
                {
                    b.Navigation("Issues");
                });

            modelBuilder.Entity("Backend.Models.User", b =>
                {
                    b.Navigation("Cars");
                });
#pragma warning restore 612, 618
        }
    }
}
