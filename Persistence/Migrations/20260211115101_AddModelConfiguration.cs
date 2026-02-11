using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddModelConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_BreakfastId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_DinnerId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_LunchId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_SnacksId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Meals_MealId",
                table: "Products");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Login",
                table: "Users",
                column: "Login",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_BreakfastId",
                table: "DietDays",
                column: "BreakfastId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_DinnerId",
                table: "DietDays",
                column: "DinnerId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_LunchId",
                table: "DietDays",
                column: "LunchId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_SnacksId",
                table: "DietDays",
                column: "SnacksId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Meals_MealId",
                table: "Products",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_BreakfastId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_DinnerId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_LunchId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_SnacksId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Meals_MealId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Login",
                table: "Users");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_BreakfastId",
                table: "DietDays",
                column: "BreakfastId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_DinnerId",
                table: "DietDays",
                column: "DinnerId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_LunchId",
                table: "DietDays",
                column: "LunchId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_SnacksId",
                table: "DietDays",
                column: "SnacksId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Meals_MealId",
                table: "Products",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id");
        }
    }
}
