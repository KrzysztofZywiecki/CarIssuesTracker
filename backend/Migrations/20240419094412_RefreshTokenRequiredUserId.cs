using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RefreshTokenRequiredUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokenData_AspNetUsers_ApplicationUserId",
                table: "RefreshTokenData");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "RefreshTokenData",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokenData_AspNetUsers_ApplicationUserId",
                table: "RefreshTokenData",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokenData_AspNetUsers_ApplicationUserId",
                table: "RefreshTokenData");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "RefreshTokenData",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokenData_AspNetUsers_ApplicationUserId",
                table: "RefreshTokenData",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
