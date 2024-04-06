using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedCarIssueNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarIssues_Cars_CarId",
                table: "CarIssues");

            migrationBuilder.AlterColumn<Guid>(
                name: "CarId",
                table: "CarIssues",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CarIssues_Cars_CarId",
                table: "CarIssues",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarIssues_Cars_CarId",
                table: "CarIssues");

            migrationBuilder.AlterColumn<Guid>(
                name: "CarId",
                table: "CarIssues",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_CarIssues_Cars_CarId",
                table: "CarIssues",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id");
        }
    }
}
