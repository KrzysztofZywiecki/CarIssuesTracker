using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedCarClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarIssues_Users_OwnerId",
                table: "CarIssues");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "CarIssues",
                newName: "CarId");

            migrationBuilder.RenameIndex(
                name: "IX_CarIssues_OwnerId",
                table: "CarIssues",
                newName: "IX_CarIssues_CarId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDateTime",
                table: "CarIssues",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "RepairCost",
                table: "CarIssues",
                type: "decimal(8, 2)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RepairDateTime",
                table: "CarIssues",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OwnerId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cars_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_OwnerId",
                table: "Cars",
                column: "OwnerId");

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

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropColumn(
                name: "CreateDateTime",
                table: "CarIssues");

            migrationBuilder.DropColumn(
                name: "RepairCost",
                table: "CarIssues");

            migrationBuilder.DropColumn(
                name: "RepairDateTime",
                table: "CarIssues");

            migrationBuilder.RenameColumn(
                name: "CarId",
                table: "CarIssues",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_CarIssues_CarId",
                table: "CarIssues",
                newName: "IX_CarIssues_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarIssues_Users_OwnerId",
                table: "CarIssues",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
